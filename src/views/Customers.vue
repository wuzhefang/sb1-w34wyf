`<template>
  <div class="customers-container p-6">
    <div class="header-actions mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">客户管理</h1>
      <div class="flex gap-4">
        <el-input
          v-model="searchQuery"
          placeholder="搜索客户"
          class="w-64"
          :prefix-icon="Search"
        />
        <el-button type="primary" @click="handleAdd">
          <template #icon>
            <Icon icon="mdi:plus" />
          </template>
          新增客户
        </el-button>
      </div>
    </div>

    <el-card>
      <el-table :data="filteredCustomers" stripe>
        <el-table-column prop="id" label="客户ID" width="100" />
        <el-table-column prop="name" label="客户名称" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
        <el-table-column prop="type" label="客户类型">
          <template #default="{ row }">
            <el-tag :type="getTagType(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(row)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑客户' : '新增客户'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" type="textarea" />
        </el-form-item>
        <el-form-item label="客户类型" prop="type">
          <el-select v-model="form.type" class="w-full">
            <el-option
              v-for="type in customerTypes"
              :key="type"
              :label="type"
              :value="type"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// Mock data
const customers = ref([
  {
    id: '1001',
    name: '上海某某贸易有限公司',
    contact: '张三',
    phone: '13800138000',
    address: '上海市浦东新区某某路123号',
    type: '批发商'
  },
  {
    id: '1002',
    name: '北京某某科技有限公司',
    contact: '李四',
    phone: '13900139000',
    address: '北京市海淀区某某街456号',
    type: '零售商'
  }
])

const customerTypes = ['批发商', '零售商', '代理商', '终端客户']
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(customers.value.length)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

const form = ref({
  name: '',
  contact: '',
  phone: '',
  address: '',
  type: ''
})

const rules = {
  name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  type: [{ required: true, message: '请选择客户类型', trigger: 'change' }]
}

const filteredCustomers = computed(() => {
  return customers.value.filter(customer => 
    customer.name.includes(searchQuery.value) ||
    customer.contact.includes(searchQuery.value) ||
    customer.phone.includes(searchQuery.value)
  )
})

const getTagType = (type) => {
  const types = {
    '批发商': 'primary',
    '零售商': 'success',
    '代理商': 'warning',
    '终端客户': 'info'
  }
  return types[type] || 'info'
}

const handleAdd = () => {
  isEdit.value = false
  form.value = {
    name: '',
    contact: '',
    phone: '',
    address: '',
    type: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除该客户吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    customers.value = customers.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  })
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        const index = customers.value.findIndex(item => item.id === form.value.id)
        customers.value[index] = { ...form.value }
        ElMessage.success('编辑成功')
      } else {
        const newId = String(1000 + customers.value.length + 1)
        customers.value.push({
          id: newId,
          ...form.value
        })
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}
</script>

<style>
.el-tag {
  @apply mx-1;
}
</style>`
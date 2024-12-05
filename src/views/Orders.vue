`<template>
  <div class="orders-container p-6">
    <div class="header-actions mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">订单管理</h1>
      <div class="flex gap-4">
        <el-input
          v-model="searchQuery"
          placeholder="搜索订单"
          class="w-64"
          :prefix-icon="Search"
        />
        <el-button type="primary" @click="handleAdd">
          <template #icon>
            <Icon icon="mdi:plus" />
          </template>
          新增订单
        </el-button>
      </div>
    </div>

    <el-card>
      <el-table :data="filteredOrders" stripe>
        <el-table-column prop="id" label="订单编号" width="120" />
        <el-table-column prop="customerName" label="客户名称" />
        <el-table-column prop="amount" label="订单金额">
          <template #default="{ row }">
            <el-input-number 
              v-if="row.editing"
              v-model="row.amount"
              :min="0"
              :precision="2"
              :controls="false"
              class="w-32"
            />
            <span v-else>¥{{ row.amount.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template #default="{ row }">
            <el-select 
              v-if="row.editing"
              v-model="row.status"
              class="w-32"
            >
              <el-option
                v-for="status in orderStatuses"
                :key="status.value"
                :label="status.label"
                :value="status.value"
              />
            </el-select>
            <el-tag v-else :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="创建时间" width="160">
          <template #default="{ row }">
            <el-date-picker
              v-if="row.editing"
              v-model="row.date"
              type="datetime"
              class="w-48"
            />
            <span v-else>{{ formatDate(row.date) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input
              v-if="row.editing"
              v-model="row.remark"
              type="textarea"
              rows="1"
            />
            <span v-else>{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group v-if="!row.editing">
              <el-button type="primary" size="small" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(row)">
                删除
              </el-button>
            </el-button-group>
            <el-button-group v-else>
              <el-button type="success" size="small" @click="handleSave(row)">
                保存
              </el-button>
              <el-button size="small" @click="handleCancel(row)">
                取消
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
      title="新增订单"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" />
        </el-form-item>
        <el-form-item label="订单金额" prop="amount">
          <el-input-number
            v-model="form.amount"
            :min="0"
            :precision="2"
            :controls="false"
            class="w-full"
          />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="form.status" class="w-full">
            <el-option
              v-for="status in orderStatuses"
              :key="status.value"
              :label="status.label"
              :value="status.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" />
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
import dayjs from 'dayjs'

const orderStatuses = [
  { value: 'pending', label: '待处理' },
  { value: 'processing', label: '处理中' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' }
]

// Mock data
const orders = ref([
  {
    id: 'ORD20231001',
    customerName: '上海某某贸易有限公司',
    amount: 12500.00,
    status: 'completed',
    date: new Date('2023-10-01T10:00:00'),
    remark: '批量采购订单',
    editing: false
  },
  {
    id: 'ORD20231002',
    customerName: '北京某某科技有限公司',
    amount: 8800.50,
    status: 'processing',
    date: new Date('2023-10-02T14:30:00'),
    remark: '季度常规订单',
    editing: false
  }
])

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(orders.value.length)
const dialogVisible = ref(false)
const formRef = ref(null)

const form = ref({
  customerName: '',
  amount: 0,
  status: 'pending',
  remark: ''
})

const rules = {
  customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  amount: [{ required: true, message: '请输入订单金额', trigger: 'blur' }],
  status: [{ required: true, message: '请选择订单状态', trigger: 'change' }]
}

const filteredOrders = computed(() => {
  return orders.value.filter(order => 
    order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    processing: 'primary',
    completed: 'success',
    cancelled: 'info'
  }
  return types[status] || 'info'
}

const getStatusLabel = (status) => {
  return orderStatuses.find(s => s.value === status)?.label || status
}

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

const handleAdd = () => {
  form.value = {
    customerName: '',
    amount: 0,
    status: 'pending',
    remark: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  row.editing = true
  row._originalData = { ...row }
}

const handleSave = (row) => {
  row.editing = false
  delete row._originalData
  ElMessage.success('保存成功')
}

const handleCancel = (row) => {
  Object.assign(row, row._originalData)
  row.editing = false
  delete row._originalData
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除该订单吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    orders.value = orders.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  })
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      const newId = `ORD${dayjs().format('YYYYMMDD')}${String(orders.value.length + 1).padStart(2, '0')}`
      orders.value.push({
        id: newId,
        date: new Date(),
        editing: false,
        ...form.value
      })
      ElMessage.success('添加成功')
      dialogVisible.value = false
    }
  })
}
</script>

<style scoped>
.el-input-number.is-controls-right .el-input__wrapper {
  @apply pr-0;
}

.el-tag {
  @apply mx-1;
}
</style>`
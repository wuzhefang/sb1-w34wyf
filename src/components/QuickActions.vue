`<template>
  <div class="quick-actions">
    <div 
      v-for="action in actions" 
      :key="action.id" 
      class="action-item"
    >
      <div class="action-icon" :class="action.iconClass">
        <Icon :icon="action.icon" />
      </div>
      <span class="action-text">{{ action.text }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'QuickActions',
  components: {
    Icon
  },
  setup() {
    const actions = [
      { id: 1, text: '经营情况', icon: 'mdi:chart-line', iconClass: 'bg-teal-500' },
      { id: 2, text: '销售订单工作台', icon: 'mdi:shopping-cart', iconClass: 'bg-teal-500' },
      { id: 3, text: '销售工作台', icon: 'mdi:desktop', iconClass: 'bg-teal-500' },
      { id: 4, text: '客户账本', icon: 'mdi:book', iconClass: 'bg-teal-500' },
      { id: 5, text: '供应商账本', icon: 'mdi:truck', iconClass: 'bg-teal-500' },
      { id: 6, text: '销售统计(试用版)', icon: 'mdi:chart-bar', iconClass: 'bg-teal-500' },
      { id: 7, text: '收款情况统计', icon: 'mdi:cash', iconClass: 'bg-teal-500' },
      { id: 8, text: '现存量', icon: 'mdi:package', iconClass: 'bg-teal-500' },
      { id: 9, text: '设置', icon: 'mdi:cog', iconClass: 'bg-gray-400' }
    ]

    return {
      actions
    }
  }
})
</script>

<style scoped>
.quick-actions {
  @apply grid grid-cols-9 gap-4 mb-6;
}

.action-item {
  @apply flex flex-col items-center gap-2 p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow;
}

.action-icon {
  @apply w-12 h-12 rounded-lg text-white flex items-center justify-center;
}

.action-text {
  @apply text-sm text-gray-700 text-center;
}
</style>`
`<template>
  <div class="time-filters">
    <button 
      v-for="filter in filters" 
      :key="filter.value"
      :class="{ active: modelValue === filter.value }"
      @click="$emit('update:modelValue', filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TimeFilter',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup() {
    const filters = [
      { label: '今日', value: 'today' },
      { label: '昨日', value: 'yesterday' },
      { label: '查看今日日报表 >', value: 'history' }
    ]

    return {
      filters
    }
  },
  emits: ['update:modelValue']
})
</script>

<style scoped>
.time-filters {
  @apply flex gap-2;
}

.time-filters button {
  @apply px-4 py-2 rounded-md transition-colors;
}

.time-filters button.active {
  @apply bg-orange-500 text-white;
}
</style>`
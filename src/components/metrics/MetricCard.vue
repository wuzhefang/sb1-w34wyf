`<template>
  <div class="metric-card">
    <span class="label">{{ label }}</span>
    <div class="value-container">
      <span class="unit">{{ unit }}</span>
      <span class="amount">{{ amount }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MetricCard',
  props: {
    label: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    amount: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style scoped>
.metric-card {
  @apply flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm;
}

.label {
  @apply text-gray-600 text-sm;
}

.value-container {
  @apply flex items-baseline gap-2;
}

.unit {
  @apply text-sm text-gray-500;
}

.amount {
  @apply text-2xl font-bold text-gray-900;
}
</style>`
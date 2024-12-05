`<template>
  <div class="business-metrics">
    <div class="metrics-header">
      <h2 class="text-lg font-medium">经营情况</h2>
      <TimeFilter v-model="activeTab" />
    </div>

    <div class="metrics-grid">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.id"
        v-bind="metric"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TimeFilter from './metrics/TimeFilter.vue'
import MetricCard from './metrics/MetricCard.vue'

export default defineComponent({
  name: 'BusinessMetrics',
  components: {
    TimeFilter,
    MetricCard
  },
  setup() {
    const activeTab = ref('today')
    const metrics = [
      { id: 1, label: '销售金额', unit: '0笔', amount: '0.00' },
      { id: 2, label: '退货金额', unit: '0笔', amount: '0.00' },
      { id: 3, label: '收款金额', unit: '0笔', amount: '0.00' }
    ]

    return {
      activeTab,
      metrics
    }
  }
})
</script>

<style scoped>
.business-metrics {
  @apply bg-white p-6 rounded-lg mb-6;
}

.metrics-header {
  @apply flex justify-between items-center mb-6;
}

.metrics-grid {
  @apply grid grid-cols-3 gap-6;
}
</style>`
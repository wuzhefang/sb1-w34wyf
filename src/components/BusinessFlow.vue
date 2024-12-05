`<template>
  <div class="business-flow">
    <h2 class="text-lg font-medium mb-4">业务流程图</h2>
    <div class="flow-diagram">
      <div class="flow-step">
        <div class="flow-icon">进货订单</div>
        <div class="flow-arrow">→</div>
      </div>
      <div class="flow-step">
        <div class="flow-icon">采购单</div>
        <div class="flow-arrow">→</div>
      </div>
      <div class="flow-step">
        <div class="flow-icon">销售单</div>
        <div class="flow-arrow">→</div>
      </div>
      <div class="flow-step">
        <div class="flow-icon">销售订单</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.business-flow {
  @apply bg-white p-6 rounded-lg;
}

.flow-diagram {
  @apply flex items-center justify-between;
}

.flow-step {
  @apply flex items-center;
}

.flow-icon {
  @apply bg-teal-100 text-teal-700 px-4 py-2 rounded-lg;
}

.flow-arrow {
  @apply text-teal-500 mx-4 text-xl;
}
</style>`
`<template>
  <div class="step-guide">
    <h2 class="text-lg font-medium mb-4">4步快速体验产品</h2>
    <div class="steps-container">
      <div v-for="(step, index) in steps" :key="index" class="step-item">
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
          <button class="view-details">查看详情 ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepGuide',
  setup() {
    const steps = [
      {
        title: '录几条 商品和客户',
        description: '去录商品、去录客户'
      },
      {
        title: '现在就去开单吧~',
        description: '去开单、去结算、查看订单'
      },
      {
        title: '来查查报表吧~',
        description: '查看销售统计'
      },
      {
        title: '3分钟 看选项设入门解',
        description: '去查看快速入门'
      }
    ]

    return {
      steps
    }
  }
})
</script>

<style scoped>
.step-guide {
  @apply bg-white p-6 rounded-lg mb-6;
}

.steps-container {
  @apply grid grid-cols-4 gap-4;
}

.step-item {
  @apply flex items-start gap-3 bg-orange-50 rounded-lg p-4;
}

.step-number {
  @apply w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold;
}

.view-details {
  @apply text-orange-500 mt-2 text-sm;
}
</style>`
`<template>
  <div class="home-container">
    <StepGuide />
    <QuickActions />
    <BusinessMetrics />
    <BusinessFlow />
    <ActivitySection />
  </div>
</template>

<script setup>
import StepGuide from '../components/StepGuide.vue'
import QuickActions from '../components/QuickActions.vue'
import BusinessMetrics from '../components/BusinessMetrics.vue'
import BusinessFlow from '../components/BusinessFlow.vue'
import ActivitySection from '../components/ActivitySection.vue'
</script>

<style scoped>
.home-container {
  @apply space-y-6 p-6;
}
</style>`
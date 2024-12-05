`<template>
  <div class="activity-section">
    <div class="section-header">
      <h2 class="text-lg font-medium">活动</h2>
      <a href="#" class="text-orange-500">更多活动 ></a>
    </div>
    <div class="activities">
      <div v-for="activity in activities" :key="activity.id" class="activity-card">
        <img :src="activity.image" :alt="activity.title" class="activity-image">
        <div class="activity-content">
          <h3>{{ activity.title }}</h3>
          <p>{{ activity.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activities = [
  {
    id: 1,
    title: '1分钟快速教程',
    date: '4月24日',
    image: '/activity1.jpg'
  },
  {
    id: 2,
    title: '机械行业优化教程',
    date: '10月22日',
    image: '/activity2.jpg'
  }
]
</script>

<style scoped>
.activity-section {
  @apply bg-white p-6 rounded-lg;
}

.section-header {
  @apply flex justify-between items-center mb-4;
}

.activities {
  @apply grid grid-cols-2 gap-4;
}

.activity-card {
  @apply bg-gray-50 rounded-lg overflow-hidden;
}

.activity-image {
  @apply w-full h-32 object-cover;
}

.activity-content {
  @apply p-4;
}
</style>`
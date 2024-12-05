`<template>
  <div class="features-container p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">特搜导航</h1>
      <p class="text-gray-600">发现更多行业解决方案</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="feature in features" :key="feature.id" class="feature-card">
        <div class="feature-header">
          <Icon :icon="feature.icon" class="text-teal-500 text-2xl" />
          <span class="feature-tag" :class="feature.tagType">{{ feature.tag }}</span>
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
        <div class="feature-stats">
          <span class="stat-item">
            <Icon icon="mdi:eye" />
            {{ feature.views }}
          </span>
          <span class="stat-item">
            <Icon icon="mdi:thumb-up" />
            {{ feature.likes }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const features = [
  {
    id: 1,
    title: '零售行业解决方案',
    description: '适用于便利店、超市、百货等零售业态，提供完整的进销存管理方案',
    icon: 'mdi:store',
    tag: '热门',
    tagType: 'hot',
    views: '2.3k',
    likes: '456'
  },
  {
    id: 2,
    title: '餐饮行业解决方案',
    description: '专为餐饮企业打造，包含点餐、库存、会员等完整功能',
    icon: 'mdi:food',
    tag: '推荐',
    tagType: 'recommended',
    views: '1.8k',
    likes: '389'
  },
  {
    id: 3,
    title: '服装行业解决方案',
    description: '覆盖服装行业特性，支持多规格、多款式管理',
    icon: 'mdi:hanger',
    tag: '新品',
    tagType: 'new',
    views: '1.2k',
    likes: '245'
  },
  {
    id: 4,
    title: '美容美发解决方案',
    description: '包含预约、会员管理、营销活动等功能',
    icon: 'mdi:scissors-cutting',
    tag: '热门',
    tagType: 'hot',
    views: '1.5k',
    likes: '312'
  },
  {
    id: 5,
    title: '汽配行业解决方案',
    description: '支持汽配件编码管理、车辆维修记录等专业功能',
    icon: 'mdi:car',
    tag: '推荐',
    tagType: 'recommended',
    views: '980',
    likes: '198'
  },
  {
    id: 6,
    title: '医疗器械解决方案',
    description: '符合医疗器械行业特殊要求，支持批号、效期管理',
    icon: 'mdi:hospital',
    tag: '新品',
    tagType: 'new',
    views: '856',
    likes: '167'
  }
]
</script>

<style scoped>
.feature-card {
  @apply bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow;
}

.feature-header {
  @apply flex justify-between items-center mb-4;
}

.feature-tag {
  @apply px-2 py-1 rounded-full text-xs font-medium;
}

.feature-tag.hot {
  @apply bg-red-100 text-red-600;
}

.feature-tag.recommended {
  @apply bg-blue-100 text-blue-600;
}

.feature-tag.new {
  @apply bg-green-100 text-green-600;
}

.feature-title {
  @apply text-lg font-bold mb-2;
}

.feature-description {
  @apply text-gray-600 text-sm mb-4;
}

.feature-stats {
  @apply flex items-center gap-4 text-gray-500 text-sm;
}

.stat-item {
  @apply flex items-center gap-1;
}
</style>`
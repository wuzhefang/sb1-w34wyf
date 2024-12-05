`<template>
  <aside class="sidebar">
    <nav class="nav-menu">
      <RouterLink 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path }"
      >
        <Icon :icon="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

const menuItems = [
  { name: '首页', path: '/', icon: 'mdi:home' },
  { name: '特搜导航', path: '/features', icon: 'mdi:compass' },
  { name: '客户管理', path: '/customers', icon: 'mdi:account-group' },
  { name: '订单管理', path: '/orders', icon: 'mdi:file-document' },
  { name: '数据统计', path: '/statistics', icon: 'mdi:chart-bar' }
]
</script>

<style scoped>
.sidebar {
  @apply w-48 bg-[#00897B] text-white min-h-screen;
}

.nav-menu {
  @apply py-4;
}

.nav-item {
  @apply flex items-center gap-2 px-4 py-3 hover:bg-[#007A6D] transition-colors;
}

.nav-item.active {
  @apply bg-[#007A6D];
}
</style>`
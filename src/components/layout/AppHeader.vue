`<template>
  <header class="header">
    <div class="logo">
      <img src="/logo.svg" alt="Logo" class="h-8" />
    </div>
    <div class="search-bar">
      <el-input 
        placeholder="好生意机会圈00" 
        class="search-input"
      >
        <template #append>
          <el-button type="primary">
            体验行业方案
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="header-actions">
      <span class="action-item">
        <Icon icon="mdi:message" class="text-xl" />
        <span>消息</span>
      </span>
      <span class="action-item">
        <Icon icon="mdi:help-circle" class="text-xl" />
        <span>在线客服</span>
      </span>
      <el-dropdown>
        <div class="user-profile">
          <el-avatar :size="32" src="/avatar.png" />
          <span>培训师管理</span>
          <Icon icon="mdi:chevron-down" class="text-gray-400" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>账户设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style scoped>
.header {
  @apply flex items-center justify-between px-6 py-3 bg-white border-b;
}

.logo {
  @apply flex items-center;
}

.search-bar {
  @apply flex-1 max-w-xl mx-12;
}

.search-input :deep(.el-input-group__append) {
  @apply p-0;
}

.search-input :deep(.el-button) {
  @apply m-0 border-0 rounded-none;
}

.header-actions {
  @apply flex items-center gap-6;
}

.action-item {
  @apply flex items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer;
}

.user-profile {
  @apply flex items-center gap-2 cursor-pointer;
}
</style>`
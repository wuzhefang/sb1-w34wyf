`<template>
  <div class="app-container">
    <AppHeader />
    <div class="main-layout">
      <AppSidebar />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    AppHeader,
    AppSidebar
  }
})
</script>

<style>
.app-container {
  @apply min-h-screen bg-gray-50;
}

.main-layout {
  @apply flex;
}

.main-content {
  @apply flex-1;
}
</style>`
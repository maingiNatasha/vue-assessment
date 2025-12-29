/***@component: [Component Name]
  * @created-date: [Current Date in DD-MM-YYYY format]
  * @leysco-version: 1.0.0* @description: [Brief description]
*/

<script setup>
  import { ref } from 'vue'
  import SideBar from '@/components/SideBar.vue'
  import TopNav from '@/components/TopNav.vue'

  const isSidebarOpen = ref(false)

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
</script>

<template>
  <div class="layout">
    <SideBar :open="isSidebarOpen" />

    <div class="main">
      <TopNav @toggle-sidebar="toggleSidebar" />
      <router-view />
    </div>
  </div>
</template>

<style scoped>
  .layout {
    display: flex;
  }

  .main {
    flex: 1;
    padding-top: 34px;
    min-height: calc(100vh - 34px);
  }

  @media (min-width: 768px) {
    .sidebar {
      transform: translateX(0);
      position: relative;
    }
  }
</style>

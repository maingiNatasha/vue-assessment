/***@component: [Component Name]
  * @created-date: [Current Date in DD-MM-YYYY format]
  * @leysco-version: 1.0.0* @description: [Brief description]
*/

<script setup>
  import TopNav from '@/components/TopNav.vue'
  import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <div class="layout">
    <!-- Sidebar (fixed width) -->
    <SideBar />

    <!-- Main content area -->
    <div class="main-content">
      <!-- Top navigation -->
      <TopNav />

      <!-- Routed page content -->
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .layout {
    display: flex;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .page-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background-color: #f3f4f6;
  }
</style>

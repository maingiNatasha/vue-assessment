<script setup>
  import { computed, ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'

  const auth = useAuthStore()
  const router = useRouter()

  const showDropdown = ref(false)

  const isDark = computed(() =>
    auth.theme === 'dark'
  )

  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
  }

  const toggleTheme = () => {
    auth.toggleTheme()
    document.body.classList.toggle('dark')
  }

  const logout = () => {
    auth.logout()
    router.push('/')
  }
</script>

<template>
  <nav class="top-nav">
    <!-- Collapse/Expand Button -->
    <div class="left">
      <button class="hamburger" @click="$emit('toggle-sidebar')">
        <i class="fa-solid fa-bars"></i>
      </button>
      <span class="logo">MyCompany</span>
    </div>

    <!-- Right actions -->
    <div class="right">
      <!-- User dropdown -->
      <div class="user-menu">
        <button class="user-btn" @click="toggleDropdown" style="margin-right: 0.15rem;">
          <i class="fa-solid fa-user" style="margin-right: 0.25rem"></i>
          {{ auth.user.username }}
          <i class="fa-solid fa-chevron-down" style="margin-left:4px;"></i>
        </button>

        <div v-if="showDropdown" class="dropdown">
          <button class="dropdown-item" @click="logout">
            Logout
          </button>
        </div>
      </div>

      <!-- Theme toggle -->
      <button class="icon-btn" @click="toggleTheme">
        <i :class="isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"></i>
      </button>
    </div>
  </nav>
</template>

<style scoped>
  .top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    z-index: 1100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: white;
    border-bottom: 1px solid #e5e7eb;
  }

  .logo {
    font-size: 18px;
    font-weight: 600;
  }

  .left, .right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .hamburger {
    background: none;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }

  .user-menu {
    position: relative;
  }

  .user-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 8px;
    width: 140px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .dropdown-item {
    width: 100%;
    padding: 10px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background: #f3f4f6;
  }
</style>


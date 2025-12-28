<script setup>
  import { computed, ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useUiStore } from '@/stores/ui'

  import { useRouter } from 'vue-router'

  const auth = useAuthStore()
  const ui = useUiStore()
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
    <div>
      <button class="collapse-btn" @click="ui.toggleCollapse">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

    <!-- Logo / Branding -->
    <div class="brand">
      Company Logo
    </div>

    <!-- Right actions -->
    <div class="actions">
      <!-- User dropdown -->
      <div class="user-menu">
        <button class="user-btn" @click="toggleDropdown" style="margin-right: 0.5rem;">
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
  }

  .brand {
    font-size: 20px;
    font-weight: 600;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 16px;
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


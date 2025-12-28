<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useUiStore } from '@/stores/ui'

  const auth = useAuthStore()
  const ui = useUiStore()

  const collapsed = ref(false)
  const mobileOpen = ref(false)
  const activeItem = ref('Dashboard') // You can set dynamically based on route

  // Navigation items
  const navItems = [
    { name: 'Dashboard', route: '/dashboard', icon: 'fa-solid fa-house' },
  ]

  // Close sidebar on mobile when navigating
  function handleResize() {
    if (window.innerWidth >= 768) {
      mobileOpen.value = false // ensure mobile sidebar closes
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>

<template>
  <aside :class="['sidebar', { collapsed: ui.collapsed, 'mobile-open': ui.mobileOpen }]">
    <!-- User Profile -->
    <div class="profile" v-if="!collapsed">
      <i class="fa-solid fa-user sidebar-avatar"></i>
      <div class="user-info">
        <span class="name">{{ `${auth.user.first_name} ${auth.user.last_name}` }}</span>
        <span class="role">{{ auth.user.role }}</span>
      </div>
    </div>

    <!-- Navigation Items -->
    <nav>
      <ul>
        <li v-for="item in navItems" :key="item.name" :class="{ active: activeItem === item.name }">
          <router-link :to="item.route">
            <i :class="item.icon"></i>
            <span v-if="!collapsed">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 220px;
    transition: transform 0.3s, width 0.3s;
    z-index: 1000;
    background-color: #ffffff;
    padding: 0 1rem;
  }

  /* Collapsed desktop */
  .sidebar.collapsed {
    width: 60px;
  }

  /* Mobile visible */
  .sidebar.mobileOpen {
    transform: translateX(0);
  }

  .profile {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .sidebar-avatar {
    font-size: 40px;
    color: black;
    border-radius: 50%;
    background-color: #d1d5db; /* optional circle background */
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-info {
    margin-left: 0.75rem;
    font-size: 14px;
    display:flex;
    flex-direction:
    column; gap:0.25rem
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  nav li {
    margin: 0.5rem 0;
  }

  nav li.active {
    background-color: #d1d5db;
    border-radius: 5px;
  }

  nav a {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    color: black;
    text-decoration: none;
  }

  nav a i {
    margin-right: 0.75rem;
  }

  .collapse-btn {
    background: none;
    border: none;
    color: black;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 0.5rem;
    margin-top: 1.2rem;
  }

  /* Desktop: visible by default */
  @media (min-width: 768px) {
    .sidebar {
      transform: translateX(0);
    }
    .sidebar.collapsed {
      width: 60px;
    }
  }

  /* Mobile: hidden by default, shown when mobile-open */
  @media (max-width: 767px) {
    .sidebar {
      transform: translateX(-100%);
    }
    .sidebar.mobile-open {
      transform: translateX(0);
    }
  }

</style>

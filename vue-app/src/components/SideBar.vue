<script setup>
  import {  } from 'vue'
  import { useAuthStore } from '@/stores/auth'

  // Define props
  defineProps({
    open: Boolean
  })

  const auth = useAuthStore()

  // Navigation items
  const navItems = [
    { name: 'Dashboard', route: '/dashboard', icon: 'fa-solid fa-house' },
  ]

</script>

<template>
  <aside :class="['sidebar', { open, collapsed: !open }]">
    <!-- User Profile -->
    <div class="profile" v-if="open">
      <i class="fa-solid fa-user sidebar-avatar"></i>
      <div class="user-info">
        <span class="name">{{ `${auth.user.first_name} ${auth.user.last_name}` }}</span>
        <span class="role">{{ auth.user.role }}</span>
      </div>
    </div>

    <!-- Navigation Items -->
    <nav>
      <ul>
        <li v-for="item in navItems" :key="item.name">
          <router-link :to="item.route">
            <i :class="item.icon"></i>
            <span v-if="open">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 54px;
    height: calc(100vh - 54px);
    width: 220px;
    z-index: 1000;
    padding: 0 0.5rem;
    background: #ffffff;
    color: black;
    transition: transform 0.23s ease;
  }

  .sidebar.collapsed {
    width: 50px;
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

  nav a {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    color: black;
    text-decoration: none;
    font-size: 15px;
  }

  /* Expanded sidebar */
  .sidebar:not(.collapsed) nav a i {
    margin-right: 0.75rem;
  }

  /* Collapsed sidebar */
  .sidebar.collapsed nav a i {
    margin-right: 0;
  }

  .router-link-exact-active {
    background-color: #d1d5db;
    border-radius: 5px;
  }


  @media (max-width: 767px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      width: 220px; /* full width on mobile */
    }

    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>

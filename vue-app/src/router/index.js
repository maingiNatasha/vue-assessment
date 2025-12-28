import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/LoginView.vue'
import PasswordResetView from '@/views/PasswordResetView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: PasswordResetView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.name === '/' && auth.isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: '/'})
    return
  }

  next()
})

export default router

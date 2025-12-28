import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    permissions: [],
    isAuthenticated: false,
    loading: false,
    loginAttempts: 0,
    cooldownUntil: null,
    token: null,
    rememberMe: false,
    logoutTimer: null,
    theme: 'light'
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    hasPermission: (state) => (permission) =>
      state.permissions.includes(permission),
    isInCooldown: (state) =>
      state.cooldownUntil && Date.now() < state.cooldownUntil
  },

  actions: {
    startAutoLogout() {
      if (this.logoutTimer) clearTimeout(this.logoutTimer)

      if (!this.token) return

      const timeLeft = this.token.expires - Date.now()
      if (timeLeft <= 0) {
        this.logout()
        return
      }

      this.logoutTimer = setTimeout(() => {
        alert('Session expired. Logging out...')
        this.logout()
      }, timeLeft)
    },

    init() {
      let token = JSON.parse(localStorage.getItem('authToken'))
      let user = JSON.parse(localStorage.getItem('user'))
      let rememberMe = true

      if (!token) {
        token = JSON.parse(sessionStorage.getItem('authToken'))
        user = JSON.parse(sessionStorage.getItem('user'))
        rememberMe = false
      }

      if (token && Date.now() < token.expires) {
        this.token = token
        this.user = user
        this.isAuthenticated = true
        this.permissions = user.permissions || []
        this.rememberMe = rememberMe
        this.startAutoLogout()
      } else {
        this.logout()
      }
    },

    loginStart() {
      this.loading = true
    },

    loginSuccess(user, rememberMe) {
      this.user = user
      this.permissions = user.permissions || []
      this.isAuthenticated = true
      this.loading = false
      this.loginAttempts = 0
      this.cooldownUntil = null
      this.rememberMe = rememberMe

      // Initialize theme from user preferences
      this.theme = user.preferences?.theme || 'light'

      // Generate a fake token (random string + expiration timestamp)
      const token = {
        value: Math.random().toString(36).substring(2), // random string
        expires: Date.now() + 30 * 60 * 1000 // token expires in 30 minutes
      }

      this.token = token

      // Store it securely
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('authToken', JSON.stringify(token))
      storage.setItem('user', JSON.stringify(user))

      this.startAutoLogout()
    },

    loginFailure() {
      this.loading = false
      this.loginAttempts++

      if (this.loginAttempts >= 3) {
        this.cooldownUntil = Date.now() + 10_000 // 10s cooldown
      }
    },

    logout() {
      this.user = null
      this.permissions = []
      this.isAuthenticated = false
      this.token = null
      this.rememberMe = false
      this.loginAttempts = 0
      this.cooldownUntil = null

      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer)
        this.logoutTimer = null
      }

      sessionStorage.removeItem('authToken')
      sessionStorage.removeItem('user')
    },

    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    }
  }
})

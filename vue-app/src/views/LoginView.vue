<script setup>
import { reactive, onMounted } from 'vue'
import userData from '../assets/user_data.json'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

// Initialize store and router
const auth = useAuthStore()
const router = useRouter()

// Reactive form
const form = reactive({
  username: '',
  password: '',
  rememberMe: auth.rememberMe
})

// Pre-fill form inputs if remembered user exists
onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem('user'))

  if (savedUser) {
    form.username = savedUser.username
    form.rememberMe = true
  }
})

// Validation rules
const passwordRules = helpers.withMessage(
  'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character',
  helpers.regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
  )
)

const rules = {
  username: { required: helpers.withMessage('Username is required', required) },
  password: { required: helpers.withMessage('Password is required', required), passwordRules },
}

const v$ = useVuelidate(rules, form)

// Submit function
const submit = async () => {
  // Trigger form validation
  const valid = await v$.value.$validate()

  if (!valid) {
    console.log('Form has errors')
    return
  }

  // Start loading
  auth.loginStart()

  // Simulate a network server request
  setTimeout(() => {
    // Check user credentials
    const user = userData.find(
      u => u.username === form.username && u.password === form.password
    )

    if (user) {
      auth.loginSuccess(user, form.rememberMe)

      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      auth.loginFailure()
      alert('Invalid username or password. Please try again.')
    }
  }, 1500)
}
</script>

<template>
  <div class="main-container">
    <div class="login-container">
      <h2 style="text-align: center;">Login</h2>

      <form class="login-form" @submit.prevent="submit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="username"
            placeholder="Enter your username"
            v-model="form.username"
          />
          <div class="error" v-if="v$.username.$error">
            <small>{{ v$.username.required.$message }}</small>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            v-model="form.password"
          />
          <div class="error" v-if="v$.password.$error">
            <small v-if="v$.password.required.$invalid">{{ v$.password.required.$message }}</small>
            <small v-if="v$.password.passwordRules.$invalid">{{ v$.password.passwordRules.$message }}</small>
          </div>
        </div>

        <div>
          <router-link to="/reset-password" class="forgot-password">Forgot Password</router-link>
        </div>

        <div>
          <label style="display: flex; align-items: center; gap: 0.2rem; font-weight: 400; margin-top: 0.5rem; font-size: 0.9rem">
            <input type="checkbox" v-model="form.rememberMe" />
            Remember Me
          </label>
        </div>

        <button type="submit" :disabled="v$.$invalid || auth.loading || auth.isInCooldown">
          <span v-if="auth.loading" class="spinner"></span>
          <span v-else>Login</span>
        </button>

        <div>
          <small class="error" v-if="auth.isInCooldown">Too many failed attempts. Try again in 10 s.</small>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
}

.login-container {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 300px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.forgot-password {
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 0.25rem;
}

.forgot-password:hover {
  color: #0056b3;
}

.error {
  color: red;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 3px solid rgba(0,0,0,0.2);
  border-top-color: rgba(0,0,0,0.8);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

label {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

input {
  padding: 0.5rem;
  font-size: 0.825rem;
}

button {
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

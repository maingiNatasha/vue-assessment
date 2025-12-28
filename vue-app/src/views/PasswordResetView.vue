<script setup>
  import { reactive, ref } from 'vue'
	import useVuelidate from '@vuelidate/core'
	import { required, helpers, email } from '@vuelidate/validators'

	// Reactive form
	const form = reactive({
		username: '',
		email: ''
	})

	// Validation rules
	const rules = {
		username: { required: helpers.withMessage('Username is required', required) },
		email: {
			required: helpers.withMessage('Email address is required', required),
			email: helpers.withMessage('Must be a valid email address', email),
		},
	}

	const v$ = useVuelidate(rules, form)

	// Loading state
  const loading = ref(false)

  // Submit function
  const submit = () => {
    // Trigger form validation
    v$.value.$validate().then(valid => {
      if (!valid) {
        console.log('Form has errors')
        return
      }

      // Start loading
      loading.value = true

      // Simulate a network server request
      setTimeout(() => {
        // Stop loading
        loading.value = false
				alert(`Password reset link sent to ${form.email}. Please check your email.`)
      }, 1500)

    })
  }
</script>

<template>
	<div class="main-container">
		<div class="password-reset-container">
			<h2 style="text-align: center;">Password Reset</h2>

			<form @submit.prevent="submit" class="password-reset-form">
				<div class="form-group">
					<label for="username">Username</label>
					<input
						id="username"
						v-model="form.username"
						type="text"
						placeholder="Enter your username"
					/>
					<div class="error" v-if="v$.username.$error">
						<small>{{ v$.username.required.$message }}</small>
					</div>
				</div>

				<div class="form-group">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="form.email"
						type="email"
						placeholder="Enter your email"
					/>
					<div class="error" v-if="v$.email.$error">
						<small>{{ v$.email.required.$message || v$.email.email.message }}</small>
					</div>
				</div>

				<div style="margin-top: 0.5rem;">
					<router-link to="/" class="back-to-login">Back to Login</router-link>
				</div>

				<button type="submit" :disabled="v$.$invalid || loading">
					<span v-if="loading">Sending...</span>
					<span v-else>Send Reset Link</span>
				</button>

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

	.password-reset-container {
		background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    width: 100%;
    max-width: 300px;
	}

	.password-reset-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

	.form-group {
		display: flex;
    flex-direction: column;
	}

	.back-to-login {
    font-size: 0.9rem;
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.25rem;
  }

  .back-to-login:hover {
    color: #0056b3;
  }

	.error {
    color: red;
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

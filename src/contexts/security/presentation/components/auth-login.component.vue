<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin" role="form" :aria-label="$t('aria.loginForm')">
      <h2>{{ $t('auth.login.title') }}</h2>

      <div class="form-row">
        <label for="username">{{ $t('auth.form.username') }}</label>
        <div class="form-field">
          <pv-input-text
            id="username"
            v-model="username"
            type="text"
            required
            :placeholder="$t('auth.form.usernamePlaceholder')"
            :aria-label="$t('aria.usernameField')"
          />
        </div>
      </div>

      <div class="form-row">
        <label for="password">{{ $t('auth.form.password') }}</label>
        <div class="form-field">
          <pv-input-text
            id="password"
            v-model="password"
            type="password"
            required
            :placeholder="$t('auth.form.passwordPlaceholder')"
            :aria-label="$t('aria.passwordField')"
          />
        </div>
      </div>

      <div class="form-actions">
        <pv-button
          type="submit"
          :label="$t('auth.login.submit')"
          :loading="isLoading"
          :disabled="isLoading"
          class="login-button"
          :aria-label="$t('aria.loginButton')"
        />
      </div>

      <div v-if="errorMessage" class="error-message" role="alert" aria-live="polite">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AuthApiService } from '../../infrastructure/auth-api.service.js'
import { UserAssembler } from '../../domain/user.assembler.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authService = new AuthApiService()

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const credentials = UserAssembler.toLoginResource(username.value, password.value)
    const response = await authService.login(credentials)

    if (response.status === 200) {
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }

      router.push('/')
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  text-align: center;
  margin: 0 0 1rem 0;
  color: var(--color-heading);
  font-size: 1.4rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.form-row label {
  margin: 0 0 0.2rem 0;
  font-weight: 500;
  color: var(--color-text);
  font-size: 0.85rem;
}

.form-field {
  width: 100%;
}

.form-actions {
  margin-top: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.6rem;
}

.error-message {
  margin-top: 0.5rem;
  padding: 0.4rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  text-align: center;
  font-size: 0.8rem;
}
</style>

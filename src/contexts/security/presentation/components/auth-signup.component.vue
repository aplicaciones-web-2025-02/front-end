<template>
  <div class="signup-form">
    <form @submit.prevent="handleSignup" role="form" :aria-label="$t('aria.signupForm')">
      <h2>{{ $t('auth.signup.title') }}</h2>

      <div class="form-row">
        <label for="firstName">{{ $t('auth.form.firstName') }}</label>
        <div class="form-field">
          <pv-input-text
            id="firstName"
            v-model="firstName"
            type="text"
            required
            :placeholder="$t('auth.form.firstNamePlaceholder')"
            :aria-label="$t('aria.firstNameField')"
          />
        </div>
      </div>

      <div class="form-row">
        <label for="lastName">{{ $t('auth.form.lastName') }}</label>
        <div class="form-field">
          <pv-input-text
            id="lastName"
            v-model="lastName"
            type="text"
            required
            :placeholder="$t('auth.form.lastNamePlaceholder')"
            :aria-label="$t('aria.lastNameField')"
          />
        </div>
      </div>

      <div class="form-row">
        <label for="email">{{ $t('auth.form.email') }}</label>
        <div class="form-field">
          <pv-input-text
            id="email"
            v-model="email"
            type="email"
            required
            :placeholder="$t('auth.form.emailPlaceholder')"
            :aria-label="$t('aria.emailField')"
          />
        </div>
      </div>

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

      <div class="form-row">
        <label for="confirmPassword">{{ $t('auth.form.confirmPassword') }}</label>
        <div class="form-field">
          <pv-input-text
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            :placeholder="$t('auth.form.confirmPasswordPlaceholder')"
            :aria-label="$t('aria.confirmPasswordField')"
          />
        </div>
      </div>

      <div class="form-actions">
        <pv-button
          type="submit"
          :label="$t('auth.signup.submit')"
          :loading="isLoading"
          :disabled="isLoading"
          class="signup-button"
          :aria-label="$t('aria.signupButton')"
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const validateForm = () => {
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !username.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = 'Please fill in all fields'
    return false
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return false
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long'
    return false
  }

  return true
}

const handleSignup = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const userData = UserAssembler.toSignupResource({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      password: password.value,
    })

    const response = await authService.signup(userData)

    if (response.status === 201) {
      router.push('/login')
    }
  } catch (error) {
    console.error('Signup error:', error)
    errorMessage.value = error.response?.data?.message || 'Signup failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.signup-form h2 {
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

.signup-button {
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

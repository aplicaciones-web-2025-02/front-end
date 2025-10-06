<template>
  <div class="signup-page">
    <div class="page-header">
      <h1>{{ $t('auth.signup.welcome') }}</h1>
      <p>{{ $t('auth.signup.description') }}</p>
    </div>

    <div class="form-container">
      <AuthSignup />
      <div class="auth-links">
        <p>{{ $t('auth.signup.hasAccount') }}</p>
        <RouterLink to="/login" class="link">{{ $t('auth.signup.loginLink') }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthSignup from '../components/auth-signup.component.vue'
</script>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 0.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-header {
  margin-bottom: 0.5rem;
  text-align: center;
}

.page-header h1 {
  color: var(--color-heading);
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
}

.page-header p {
  color: var(--color-text);
  font-size: 0.9rem;
  margin: 0.2rem 0 0 0;
}

.form-container {
  width: 100%;
}

.auth-links {
  text-align: center;
  margin-top: 0.5rem;
}

.auth-links p {
  margin: 0;
  color: var(--color-text);
  font-size: 0.8rem;
}

.link {
  color: var(--color-heading);
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style>

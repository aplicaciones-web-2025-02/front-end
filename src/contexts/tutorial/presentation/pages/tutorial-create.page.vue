<template>
  <div class="tutorial-create-page">
    <div class="page-header">
      <h1>{{ $t('tutorial.create.title') }}</h1>
      <p>{{ $t('tutorial.create.description') }}</p>
    </div>

    <div class="form-container">
      <TutorialForm />
    </div>
  </div>
</template>

<script setup>
import TutorialForm from '../components/tutorial-form.component.vue'
</script>

<style scoped>
.tutorial-create-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 600;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.form-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}
</style>

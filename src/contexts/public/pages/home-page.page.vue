<template>
  <section class="benollmar-page">
    <h1>Welcome to the Tutorial Platform</h1>
    <p>Find, create, and manage your tutorials easily.</p>
    <tutorial-form />
  </section>
</template>

<script setup>
import TutorialForm from '../../tutorial/components/tutorial-form.component.vue'
</script>

<style scoped>
.benollmar-page {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}
</style>

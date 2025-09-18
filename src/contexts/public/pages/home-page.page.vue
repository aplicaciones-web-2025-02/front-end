<template>
  <language-selector />
  <section class="benollmar-page">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.subTitle') }}</p>
    <tutorial-form />
  </section>
</template>

<script setup>
import TutorialForm from '../../tutorial/components/tutorial-form.component.vue'
import LanguageSelector from '@/shared/i18n/language-selector.component.vue'
</script>

<style scoped>
.benollmar-page {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}
</style>

<template>
  <language-selector />
  <section class="benollmar-page">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.subTitle') }}</p>
    <tutorial-form />
  </section>
</template>

<script setup>
import TutorialForm from '@/contexts/tutorial/presentation/components/tutorial-form.component.vue'
import LanguageSelector from '@/shared-kernel/presentation/ui/components/language-selector.component.vue'
</script>

<style scoped>
.benollmar-page {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}
</style>

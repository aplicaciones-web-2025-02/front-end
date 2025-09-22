<script setup>
import { ref } from 'vue'
import TutorialFormBasicInfo from './tutorial-form-basic-info.component.vue'
import TutorialFormDetails from './tutorial-form-details.component.vue'
import TutorialFormOptions from './tutorial-form-options.component.vue'

const title = ref('')
const category = ref('frontend')
const difficulty = ref('beginner')
const description = ref('')
const duration = ref(0)
const releaseDate = ref('')
const tags = ref([])
const published = ref(false)
const submitted = ref(false)

const tutorialFile = ref(null)

const submitForm = () => {
  submitted.value = true
  const tutorialData = {
    title: title.value,
    category: category.value,
    difficulty: difficulty.value,
    description: description.value,
    duration: duration.value,
    releaseDate: releaseDate.value,
    tags: tags.value,
    published: published.value,
    tutorialFile: tutorialFile.value ? tutorialFile.value.name : null,
  }
  alert('Tutorial data submitted!\n' + JSON.stringify(tutorialData, null, 2))
}
</script>

<template>
  <form @submit.prevent="submitForm" role="form" :aria-label="$t('aria.mainForm')">
    <h3 role="heading" aria-level="3">{{ $t('tutorial.form.basicInfo') }}</h3>

    <section :aria-label="$t('aria.basicInfoSection')">
      <TutorialFormBasicInfo
        v-model:title="title"
        v-model:category="category"
        v-model:difficulty="difficulty"
      />
    </section>

    <h3 role="heading" aria-level="3">{{ $t('tutorial.form.details') }}</h3>

    <section :aria-label="$t('aria.detailsSection')">
      <TutorialFormDetails
        v-model:description="description"
        v-model:duration="duration"
        v-model:releaseDate="releaseDate"
        v-model:tutorialFile="tutorialFile"
      />
    </section>

    <h3 role="heading" aria-level="3">{{ $t('tutorial.form.options') }}</h3>

    <section :aria-label="$t('aria.optionsSection')">
      <TutorialFormOptions v-model:tags="tags" v-model:published="published" />
    </section>

    <button type="submit" :aria-label="$t('aria.submitButton')">{{ $t('common.submit') }}</button>
    <p v-if="submitted" role="alert" aria-live="polite">{{ $t('tutorial.form.success') }}</p>
  </form>
</template>

<style scoped>
button[type="submit"] {
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>

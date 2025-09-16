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
    tutorialFile: tutorialFile.value ? tutorialFile.value.name : null
  }
  alert('Tutorial data submitted!\n' + JSON.stringify(tutorialData, null, 2))
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <h3>Basic Information</h3>

    <TutorialFormBasicInfo
      v-model:title="title"
      v-model:category="category"
      v-model:difficulty="difficulty"
    />

    <h3>Details</h3>

    <TutorialFormDetails
      v-model:description="description"
      v-model:duration="duration"
      v-model:releaseDate="releaseDate"
      v-model:tutorialFile="tutorialFile"
    />

    <h3>Options</h3>

    <TutorialFormOptions
      v-model:tags="tags"
      v-model:published="published"
    />

    <button type="submit">Submit</button>
    <pv-button label="Submit" />
    <p v-if="submitted">Data sent! The tutorial was saved successfully.</p>
  </form>
</template>

<style scoped>
</style>

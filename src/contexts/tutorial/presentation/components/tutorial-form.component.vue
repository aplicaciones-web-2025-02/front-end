<script setup>
import { ref, onMounted, provide } from 'vue'
import TutorialFormBasicInfo from './tutorial-form-basic-info.component.vue'
import TutorialFormDetails from './tutorial-form-details.component.vue'
import TutorialFormOptions from './tutorial-form-options.component.vue'
import { TutorialApiService } from '../../infraestructure/tutorial-api.service.js'

const tutorialService = new TutorialApiService()

const title = ref('')
const category = ref('')
const difficulty = ref('')
const description = ref('')
const duration = ref(0)
const releaseDate = ref('')
const tags = ref([])
const published = ref(false)
const submitted = ref(false)
const isLoading = ref(false)

const tutorialFile = ref(null)

const categories = ref([])
const difficulties = ref([])
const availableTags = ref([])

provide('categories', categories)
provide('difficulties', difficulties)
provide('availableTags', availableTags)

const loadReferenceData = async () => {
  try {
    isLoading.value = true
    const [categoriesData, difficultiesData, tagsData] = await Promise.all([
      tutorialService.GetCategories(),
      tutorialService.GetDifficulties(),
      tutorialService.GetTags(),
    ])

    categories.value = categoriesData
    difficulties.value = difficultiesData
    availableTags.value = tagsData

    if (categories.value.length > 0) {
      category.value = categories.value[0].value
    }
    if (difficulties.value.length > 0) {
      difficulty.value = difficulties.value[0].value
    }
  } catch (error) {
    console.error('Error loading reference data:', error)
  } finally {
    isLoading.value = false
  }
}

const submitForm = async () => {
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
  const response = await tutorialService.Create(tutorialData)

  if (response.status === 201) {
    alert('tutorial added successfully.')
  } else {
    console.error('error...')
    alert('error creating tutorial data')
  }
}

onMounted(() => {
  loadReferenceData()
})
</script>

<template>
  <div v-if="isLoading" class="loading">
    <p>{{ $t('tutorial.form.loading') }}</p>
  </div>
  <form v-else @submit.prevent="submitForm" role="form" :aria-label="$t('aria.mainForm')">
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

    <button type="submit" :disabled="isLoading" :aria-label="$t('aria.submitButton')">
      {{ $t('common.submit') }}
    </button>
    <p v-if="submitted" role="alert" aria-live="polite">{{ $t('tutorial.form.success') }}</p>
  </form>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
}

button[type='submit'] {
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button[type='submit']:hover:not(:disabled) {
  background-color: #0056b3;
}

button[type='submit']:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>

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
  alert('Data sent! The tutorial was saved successfully.')
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <h3>Basic Information</h3>

    <TutorialFormBasicInfo
      :title="title"
      :category="category"
      :difficulty="difficulty"
      @update:title="title = $event"
      @update:category="category = $event"
      @update:difficulty="difficulty = $event"
    />

    <h3>Details</h3>

    <TutorialFormDetails
      :description="description"
      :duration="duration"
      :releaseDate="releaseDate"
      :tutorialFile="tutorialFile"
      @update:description="description = $event"
      @update:duration="duration = $event"
      @update:releaseDate="releaseDate = $event"
      @update:tutorialFile="tutorialFile = $event"
    />

    <h3>Options</h3>

    <TutorialFormOptions
      :tags="tags"
      :published="published"
      @update:tags="tags = $event"
      @update:published="published = $event"
    />

    <button type="submit">Submit</button>
    <p v-if="submitted">Data sent! The tutorial was saved successfully.</p>
  </form>
</template>

<style scoped>
form {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 24px 32px 32px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

label {
  flex: 0 0 160px;
  text-align: right;
  margin-right: 24px;
  font-weight: 500;
}

.form-field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

input,
select,
textarea {
  padding: 7px 10px;
  margin-top: 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input[type="radio"],
input[type="checkbox"] {
  width: auto;
  margin-right: 6px;
}

button {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #369870;
}

h3 {
  margin: 32px 0 16px 0;
  font-size: 1.2rem;
  color: #333;
  text-align: left;
}

p {
  margin-top: 15px;
  color: green;
  text-align: center;
}
</style>

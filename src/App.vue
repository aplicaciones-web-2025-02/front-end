<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const submitted = ref(false)
const awesome = ref(false)
const textButton = ref("show")

const submitForm = () => {
  submitted.value = true
}

const showMessage = () => {
  awesome.value = !awesome.value
  textButton.value = awesome.value !== true ? "show" : "hide";
}

</script>


<template>
  <form @submit.prevent="submitForm">
    <label for="name">Name:</label>
    <input id="name" v-model="name" type="text" />

    <label for="email">Email:</label>
    <input id="email" v-model="email" type="email" />

    <button @click="showMessage">{{textButton}} message</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>


    <button type="submit">Submit</button>

    <p v-if="submitted">Form submitted!</p>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
}

label {
  margin-top: 10px;
}

input {
  padding: 5px;
  margin-top: 5px;
}

button {
  margin-top: 15px;
  padding: 8px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}

p {
  margin-top: 15px;
  color: green;
}
</style>

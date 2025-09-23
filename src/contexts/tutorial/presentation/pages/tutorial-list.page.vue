<script setup>
import { TutorialApiService } from '@/contexts/tutorial/infraestructure/tutorial-api.service.js'
import { TutorialAssembler } from '@/contexts/tutorial/Domain/tutorial.assembler.js'
import { ref, onBeforeMount } from 'vue'



const tutorials = ref([])
const tutorialService = new TutorialApiService()

const GetAllTutorial = async () => {
  const response = TutorialAssembler.toEntitiesFromResponse(await tutorialService.GetAll())
  tutorials.value = response
}

onBeforeMount(async () => {
  await GetAllTutorial()
})
</script>

<template>
  <pv-data-table :value="tutorials" tableStyle="min-width: 50rem">
    <pv-column field="title" header="title"></pv-column>
    <pv-column field="category" header="Category"></pv-column>
    <pv-column field="difficulty" header="Difficulty"></pv-column>
  </pv-data-table>

  <div v-for="tutorial in tutorials">
    <div>'title' : {{ tutorial.title }}</div>
    <div>{{ tutorial.category }}</div>
  </div>
</template>

<style scoped></style>

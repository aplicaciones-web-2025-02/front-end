<script setup>
import { TutorialApiService } from '@/contexts/tutorial/infraestructure/tutorial-api.service.js'
import { TutorialAssembler } from '@/contexts/tutorial/Domain/tutorial.assembler.js'
import { ref, onBeforeMount } from 'vue'


const tutorials = ref([])
const tutorialService = new TutorialApiService()
const loading = ref(false)
const totalRecords = ref(0)
const rows = ref(10)
const first = ref(0)
const showModal = ref(false)

const getAllTutorials = async () => {
  loading.value = true
  try {
    const response = TutorialAssembler.toEntitiesFromResponse(await tutorialService.getAll())
    tutorials.value = response
    totalRecords.value = response.length
  } catch (error) {
    console.error('Error loading tutorials:', error)
  } finally {
    loading.value = false
  }
}

const onPage = (event) => {
  first.value = event.first
  rows.value = event.rows
}

const navigateToCreate = () => {
  showModal.value = true
}

const deleteTutorial = async (id) => {
  const response = await tutorialService.delete(id)

  if (response.status === 200) {
    alert('tutorial deleted')
    await getAllTutorials()
  }
}

onBeforeMount(async () => {
  await getAllTutorials()
})
</script>

<template>
  <div class="tutorial-list">
    <div class="page-header">
      <h1 class="page-title">{{ $t('tutorial.list.title') }}</h1>
      <pv-button
        :label="$t('tutorial.list.createButton')"
        icon="pi pi-plus"
        class="create-button"
        @click="navigateToCreate"
        severity="success"
      />
    </div>

    <pv-data-table
      :value="tutorials"
      :loading="loading"
      :paginator="true"
      :rows="rows"
      :totalRecords="totalRecords"
      :first="first"
      @page="onPage"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
      class="tutorial-table"
      stripedRows
      responsiveLayout="scroll"
    >
      <pv-column field="id" header="ID" sortable class="col-id">
        <template #body="slotProps">
          <span class="tutorial-id">#{{ slotProps.data.id }}</span>
        </template>
      </pv-column>

      <pv-column field="title" header="Title" sortable class="col-title">
        <template #body="slotProps">
          <div class="tutorial-title">
            <strong>{{ slotProps.data.title }}</strong>
          </div>
        </template>
      </pv-column>

      <pv-column field="category" header="Category" sortable class="col-category">
        <template #body="slotProps">
          <span>{{ slotProps.data.category }}</span>
        </template>
      </pv-column>

      <pv-column field="difficulty" header="Difficulty" sortable class="col-difficulty">
        <template #body="slotProps">
          <span>{{ slotProps.data.difficulty }}</span>
        </template>
      </pv-column>

      <pv-column field="duration" header="Duration" sortable class="col-duration">
        <template #body="slotProps">
          <span class="duration">{{ slotProps.data.duration }}min</span>
        </template>
      </pv-column>

      <pv-column field="rating" header="Rating" sortable class="col-rating">
        <template #body="slotProps">
          <div class="rating">
            <i class="pi pi-star-fill star-icon"></i>
            <span class="rating-text">{{ slotProps.data.rating || 'N/A' }}</span>
          </div>
        </template>
      </pv-column>

      <pv-column field="enrollments" header="Students" sortable class="col-enrollments">
        <template #body="slotProps">
          <span class="enrollments">{{ slotProps.data.enrollments || 0 }}</span>
        </template>
      </pv-column>
      <pv-column header="Actions" sortable class="col-actions">
        <template #body="slotProps">
          <RouterLink :to="{ name: 'editTutorial', params: { id: slotProps.data.id } }">
            Edit</RouterLink
          >
          <pv-button label="Delete" @click="deleteTutorial(slotProps.data.id)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>

  <template>
    <div class="card flex justify-center">
      <pv-dialog
        v-model:visible="showModal"
        modal
        header="Edit Tutorial"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
          >Update your information.</span
        >
        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Username</label>
          <pv-input-text id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="email" class="font-semibold w-24">Email</label>
          <pv-input-text id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
          <pv-button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          ></pv-button>
          <pv-button type="button" label="Save" @click="visible = false"></pv-button>
        </div>
      </pv-dialog>
    </div>
  </template>
</template>

<style scoped>
.tutorial-list {
  padding: 1rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.create-button {
  border-radius: 6px;
  font-weight: 500;
}

.tutorial-id {
  font-family: 'Courier New', monospace;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.tutorial-title {
  color: var(--color-heading);
}

.duration {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.rating {
  display: flex;
  align-items: center;
}

.enrollments {
  font-weight: 500;
  color: var(--color-text);
}

:deep(.col-id) {
  width: 80px;
}

:deep(.col-title) {
  max-width: 100px;
}

:deep(.col-category) {
  width: 120px;
}

:deep(.col-difficulty) {
  width: 120px;
}

:deep(.col-duration) {
  width: 100px;
}

:deep(.col-rating) {
  width: 100px;
}

:deep(.col-enrollments) {
  width: 100px;
}

.star-icon {
  color: #fbbf24;
}

.rating-text {
  margin-left: 0.25rem;
}

:deep(.tutorial-table table) {
  min-width: 50rem;
}

@media (max-width: 768px) {
  .tutorial-list {
    padding: 0.5rem;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>

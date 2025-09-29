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

const GetAllTutorial = async () => {
  loading.value = true
  try {
    const response = TutorialAssembler.toEntitiesFromResponse(await tutorialService.GetAll())
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

onBeforeMount(async () => {
  await GetAllTutorial()
})
</script>

<template>
  <div class="tutorial-list">
    <h1 class="page-title">Tutorials</h1>

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
      tableStyle="min-width: 50rem"
      stripedRows
      responsiveLayout="scroll"
    >
      <pv-column field="id" header="ID" sortable style="width: 80px">
        <template #body="slotProps">
          <span class="tutorial-id">#{{ slotProps.data.id }}</span>
        </template>
      </pv-column>

      <pv-column field="title" header="Title" sortable style="min-width: 200px">
        <template #body="slotProps">
          <div class="tutorial-title">
            <strong>{{ slotProps.data.title }}</strong>
          </div>
        </template>
      </pv-column>

      <pv-column field="category" header="Category" sortable style="width: 120px">
        <template #body="slotProps">
          <span>{{ slotProps.data.category }}</span>
        </template>
      </pv-column>

      <pv-column field="difficulty" header="Difficulty" sortable style="width: 120px">
        <template #body="slotProps">
          <span>{{ slotProps.data.difficulty }}</span>
        </template>
      </pv-column>

      <pv-column field="duration" header="Duration" sortable style="width: 100px">
        <template #body="slotProps">
          <span class="duration">{{ slotProps.data.duration }}min</span>
        </template>
      </pv-column>

      <pv-column field="rating" header="Rating" sortable style="width: 100px">
        <template #body="slotProps">
          <div class="rating">
            <i class="pi pi-star-fill text-yellow-400"></i>
            <span class="ml-1">{{ slotProps.data.rating || 'N/A' }}</span>
          </div>
        </template>
      </pv-column>

      <pv-column field="enrollments" header="Students" sortable style="width: 100px">
        <template #body="slotProps">
          <span class="enrollments">{{ slotProps.data.enrollments || 0 }}</span>
        </template>
      </pv-column>

    </pv-data-table>
  </div>
</template>

<style scoped>
.tutorial-list {
  padding: 1rem;
}

.page-title {
  margin-bottom: 1.5rem;
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 600;
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

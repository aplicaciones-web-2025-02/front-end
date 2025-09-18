<style>
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
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
<template>
  <div>
    <div class="form-row">
      <label for="description">Description</label>
      <div class="form-field">
        <textarea id="description" v-model="localDescription" rows="4" />
      </div>
    </div>
    <div class="form-row">
      <label for="duration">Duration (minutes)</label>
      <div class="form-field">
        <input id="duration" v-model="localDuration" type="number" min="0" />
        <pv-input-number v-model="localDuration" inputId="integeronly" fluid />
      </div>
    </div>
    <div class="form-row">
      <label for="releaseDate">Release Date</label>
      <div class="form-field">
        <input id="releaseDate" v-model="localReleaseDate" type="date" />
        <pv-date-picker v-model="localReleaseDate" />
      </div>
    </div>
    <div class="form-row">
      <label for="tutorialFile">Upload File</label>
      <div class="form-field">
        <input id="tutorialFile" type="file" @change="onFileChange" />
      </div>
    </div>
    <pv-file-upload
      ref="fileupload"
      mode="basic"
      name="demo[]"
      url="/api/upload"
      accept="image/*"
      :maxFileSize="100000000"
      @upload="onFileChange"
    />

    <pv-data-table :value="products">
      <pv-column field="code" header="Code"></pv-column>
      <pv-column field="name" header="Name"></pv-column>
      <pv-column field="category" header="Category"></pv-column>
      <pv-column field="quantity" header="Quantity"></pv-column>
    </pv-data-table>

    <pv-data-table :value="products" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Products</span>
          <pv-button icon="pi pi-refresh" rounded raised />
        </div>
      </template>
      <pv-column field="name" header="Name"></pv-column>
      <pv-column header="Image">
        <template #body="slotProps">
          <img
            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="w-24 rounded"
          />
        </template>
      </pv-column>
      <pv-column field="price" header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </pv-column>
      <pv-column field="category" header="Category"></pv-column>
      <pv-column field="rating" header="Reviews">
        <template #body="slotProps">
          <pv-rating :modelValue="slotProps.data.rating" readonly />
        </template>
      </pv-column>
      <pv-column header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
        </template>
      </pv-column>
      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template>
    </pv-data-table>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue'

const props = defineProps({
  description: String,
  duration: Number,
  releaseDate: String,
  tutorialFile: File,
})

const products = ref([
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5,
  },
  {
    id: '2000',
    code: 'f230fh0g3',
    name: 'laptop',
    description: 'Product Description',
    image: 'laptop.jpg',
    price: 68,
    category: 'tech',
    quantity: 50,
    inventoryStatus: 'LOWSTOCK',
    rating: 3,
  },
])

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warn'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}

const emits = defineEmits([
  'update:description',
  'update:duration',
  'update:releaseDate',
  'update:tutorialFile',
])
const { description, duration, releaseDate } = toRefs(props)
const localDescription = ref(description.value)
const localDuration = ref(duration.value)
const localReleaseDate = ref(releaseDate.value)

watch(localDescription, (val) => emits('update:description', val))
watch(localDuration, (val) => emits('update:duration', val))
watch(localReleaseDate, (val) => emits('update:releaseDate', val))

function onFileChange(e) {
  emits('update:tutorialFile', e.target.files[0])
}
</script>

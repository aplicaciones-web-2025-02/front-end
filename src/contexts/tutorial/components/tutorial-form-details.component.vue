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
      <label for="description">{{ $t('tutorial.form.description') }}</label>
      <div class="form-field">
        <textarea
          id="description"
          v-model="localDescription"
          rows="4"
          :aria-label="$t('aria.descriptionField')"
        />
      </div>
    </div>
    <div class="form-row">
      <label for="duration">{{ $t('tutorial.form.duration') }}</label>
      <div class="form-field">
        <input
          id="duration"
          v-model="localDuration"
          type="number"
          min="0"
          :aria-label="$t('aria.durationField')"
        />
        <pv-input-number
          v-model="localDuration"
          inputId="integeronly"
          fluid
          :aria-label="$t('aria.durationField')"
        />
      </div>
    </div>
    <div class="form-row">
      <label for="releaseDate">{{ $t('tutorial.form.releaseDate') }}</label>
      <div class="form-field">
        <input
          id="releaseDate"
          v-model="localReleaseDate"
          type="date"
          :aria-label="$t('aria.releaseDateField')"
        />
        <pv-date-picker v-model="localReleaseDate" :aria-label="$t('aria.releaseDateField')" />
      </div>
    </div>
    <div class="form-row">
      <label for="tutorialFile">{{ $t('tutorial.form.uploadFile') }}</label>
      <div class="form-field">
        <input
          id="tutorialFile"
          type="file"
          @change="onFileChange"
          :aria-label="$t('aria.fileUploadField')"
        />
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

    <pv-data-table :value="products" role="table" :aria-label="$t('aria.productsTable')">
      <pv-column field="code" :header="$t('dataTable.headers.code')"></pv-column>
      <pv-column field="name" :header="$t('dataTable.headers.name')"></pv-column>
      <pv-column field="category" :header="$t('dataTable.headers.category')"></pv-column>
      <pv-column field="quantity" :header="$t('dataTable.headers.quantity')"></pv-column>
    </pv-data-table>

    <pv-data-table
      :value="products"
      tableStyle="min-width: 50rem"
      role="table"
      :aria-label="$t('aria.productsTable')"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ $t('dataTable.products') }}</span>
          <pv-button icon="pi pi-refresh" rounded raised :aria-label="$t('aria.refreshButton')" />
        </div>
      </template>
      <pv-column field="name" :header="$t('dataTable.headers.name')"></pv-column>
      <pv-column :header="$t('dataTable.headers.image')">
        <template #body="slotProps">
          <img
            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            :alt="`${$t('aria.productImage')}: ${slotProps.data.name}`"
            class="w-24 rounded"
            role="img"
          />
        </template>
      </pv-column>
      <pv-column field="price" :header="$t('dataTable.headers.price')">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </pv-column>
      <pv-column field="category" :header="$t('dataTable.headers.category')"></pv-column>
      <pv-column field="rating" :header="$t('dataTable.headers.reviews')">
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

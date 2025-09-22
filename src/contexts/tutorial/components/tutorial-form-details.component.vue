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

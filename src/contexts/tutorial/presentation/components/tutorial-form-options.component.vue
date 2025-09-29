<style scoped>
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
select {
  padding: 7px 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
input[type='checkbox'] {
  width: auto;
  margin-right: 6px;
}
.checkbox-field {
  flex-direction: row;
  align-items: center;
}
</style>
<template>
  <div>
    <div class="form-row">
      <label for="tags">{{ $t('tutorial.form.tags') }}</label>
      <div class="form-field">
        <select
          id="tags"
          v-model="localTags"
          multiple
          :aria-label="$t('aria.tagsField')"
          aria-multiselectable="true"
        >
          <option v-for="tag in availableTags" :key="tag.id" :value="tag.value">
            {{ tag.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <label for="published">{{ $t('tutorial.form.published') }}</label>
      <div class="form-field checkbox-field">
        <input
          type="checkbox"
          id="published"
          v-model="localPublished"
          :aria-label="$t('aria.publishedField')"
          role="checkbox"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, inject } from 'vue'

const props = defineProps({
  tags: Array,
  published: Boolean,
})

const emits = defineEmits(['update:tags', 'update:published'])

const availableTags = inject('availableTags', [])

const { tags, published } = toRefs(props)
const localTags = ref(tags.value || [])
const localPublished = ref(published.value)

watch(localTags, (val) => emits('update:tags', val))
watch(localPublished, (val) => emits('update:published', val))
</script>

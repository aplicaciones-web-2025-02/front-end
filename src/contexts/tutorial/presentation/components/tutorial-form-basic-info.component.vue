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
input[type='radio'] {
  width: auto;
  margin-right: 6px;
}
.difficulty-options {
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}
.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.radio-option label {
  flex: none;
  text-align: left;
  margin-right: 0;
  font-weight: normal;
}
</style>
<template>
  <div>
    <div class="form-row">
      <label for="title">{{ $t('tutorial.form.title') }}</label>

      <div class="form-field">
        <input

          id="title"
          v-model="localTitle"
          type="text"
          required
          :aria-label="$t('aria.titleField')"
        />
      </div>
    </div>
    <div class="form-row">
      <label for="category">{{ $t('tutorial.form.category') }}</label>
      <div class="form-field">
        <select id="category" v-model="localCategory" :aria-label="$t('aria.categoryField')">
          <option v-for="cat in categories" :key="cat.id" :value="cat.value">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <fieldset :aria-label="$t('aria.difficultyGroup')">
        <legend>{{ $t('tutorial.form.difficulty') }}</legend>
        <div class="form-field difficulty-options">
          <div v-for="diff in difficulties" :key="diff.id" class="radio-option">
            <input
              type="radio"
              :id="diff.value.toLowerCase()"
              :value="diff.value"
              v-model="localDifficulty"
              :aria-label="$t('aria.difficultyOption', { difficulty: diff.name })"
            />
            <label :for="diff.value.toLowerCase()">{{ diff.name }}</label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, inject ,onMounted } from 'vue'

const props = defineProps({
  title: String,
  category: String,
  difficulty: String,
})

onMounted(() => {

  localTitle.value =  localStorage.getItem("title")

} )


const emits = defineEmits(['update:title', 'update:category', 'update:difficulty'])

const categories = inject('categories', [])
const difficulties = inject('difficulties', [])

const { title, category, difficulty } = toRefs(props)
const localTitle = ref(title.value)
const localCategory = ref(category.value)
const localDifficulty = ref(difficulty.value)

watch(localTitle, (val) => emits('update:title', val))
watch(localCategory, (val) => emits('update:category', val))
watch(localDifficulty, (val) => emits('update:difficulty', val))
</script>

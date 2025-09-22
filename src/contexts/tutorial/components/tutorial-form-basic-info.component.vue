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
          :aria-describedby="title - help"
        />
      </div>

      <img src="https://en.wikipedia.org/wiki/Tabby_cat " alt="cat" />
    </div>
    <div class="form-row">
      <label for="category">{{ $t('tutorial.form.category') }}</label>
      <div class="form-field">
        <select id="category" v-model="localCategory" :aria-label="$t('aria.categoryField')">
          <option value="frontend">{{ $t('tutorial.categories.frontend') }}</option>
          <option value="backend">{{ $t('tutorial.categories.backend') }}</option>
          <option value="devops">{{ $t('tutorial.categories.devops') }}</option>
          <option value="data">{{ $t('tutorial.categories.data') }}</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <fieldset :aria-label="$t('aria.difficultyGroup')">
        <legend>{{ $t('tutorial.form.difficulty') }}</legend>
        <div class="form-field" style="flex-direction: row; gap: 1rem; align-items: center">
          <input
            type="radio"
            id="beginner"
            value="beginner"
            v-model="localDifficulty"
            :aria-label="$t('aria.beginnerOption')"
          />
          <label for="beginner">{{ $t('tutorial.difficulties.beginner') }}</label>
          <input
            type="radio"
            id="intermediate"
            value="intermediate"
            v-model="localDifficulty"
            :aria-label="$t('aria.intermediateOption')"
          />
          <label for="intermediate">{{ $t('tutorial.difficulties.intermediate') }}</label>
          <input
            type="radio"
            id="advanced"
            value="advanced"
            v-model="localDifficulty"
            :aria-label="$t('aria.advancedOption')"
          />
          <label for="advanced">{{ $t('tutorial.difficulties.advanced') }}</label>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue'
const props = defineProps({
  title: String,
  category: String,
  difficulty: String,
})
const emits = defineEmits(['update:title', 'update:category', 'update:difficulty'])
const { title, category, difficulty } = toRefs(props)
const localTitle = ref(title.value)
const localCategory = ref(category.value)
const localDifficulty = ref(difficulty.value)

watch(localTitle, (val) => emits('update:title', val))
watch(localCategory, (val) => emits('update:category', val))
watch(localDifficulty, (val) => emits('update:difficulty', val))
</script>

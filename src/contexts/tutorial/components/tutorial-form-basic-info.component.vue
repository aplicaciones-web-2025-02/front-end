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
      <label for="title">Tutorial Title</label>
      <div class="form-field">
        <input id="title" v-model="localTitle" type="text" required />
      </div>
    </div>
    <div class="form-row">
      <label for="category">Category</label>
      <div class="form-field">
        <select id="category" v-model="localCategory">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="devops">DevOps</option>
          <option value="data">Data Science</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <label>Difficulty</label>
      <div class="form-field" style="flex-direction: row; gap: 1rem; align-items: center">
        <input type="radio" id="beginner" value="beginner" v-model="localDifficulty" />
        <label for="beginner">Beginner</label>
        <input type="radio" id="intermediate" value="intermediate" v-model="localDifficulty" />
        <label for="intermediate">Intermediate</label>
        <input type="radio" id="advanced" value="advanced" v-model="localDifficulty" />
        <label for="advanced">Advanced</label>
      </div>
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

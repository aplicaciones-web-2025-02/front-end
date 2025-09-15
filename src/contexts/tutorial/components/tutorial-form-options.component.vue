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
 input[type="checkbox"] {
   width: auto;
   margin-right: 6px;
 }
 </style>
<template>
  <div>
    <div class="form-row">
      <label for="tags">Tags</label>
      <div class="form-field">
        <select id="tags" v-model="localTags" multiple>
          <option value="vue">Vue</option>
          <option value="javascript">JavaScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <label for="published">Published</label>
      <div class="form-field" style="flex-direction: row; align-items: center;">
        <input type="checkbox" id="published" v-model="localPublished" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue'
const props = defineProps({
  tags: Array,
  published: Boolean
})
const emits = defineEmits(['update:tags', 'update:published'])
const { tags, published } = toRefs(props)
const localTags = ref(tags.value)
const localPublished = ref(published.value)

watch(localTags, val => emits('update:tags', val))
watch(localPublished, val => emits('update:published', val))
</script>

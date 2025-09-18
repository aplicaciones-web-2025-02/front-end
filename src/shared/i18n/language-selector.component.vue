<script setup>
import { useI18n } from 'vue-i18n'

const locale = useI18n()


const options = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
]


function changeLanguage(e) {
  console.log('e.value : ' + e.value)
  console.log('locale : ' + locale.value)
  locale.value = e.value
}
</script>

<template>
  <div class="language-selector">
    <pv-dropdown
      :options="options"
      option-label="label"
      option-value="value"
      v-model="locale"
      @change="changeLanguage"
      placeholder="Select Language"
    />
  </div>
</template>

<style scoped>
.language-selector {
  width: 200px;
}
</style>

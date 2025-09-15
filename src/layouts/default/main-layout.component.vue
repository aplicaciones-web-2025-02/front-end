<template>
  <div class="main-layout">
    <header-bar />
    <div class="layout-content">
      <left-panel />
      <main class="page-content">
        <home-page />
      </main>
    </div>
  </div>
</template>

<script setup>
import HomePage from '../../contexts/public/pages/home-page.page.vue'
</script>

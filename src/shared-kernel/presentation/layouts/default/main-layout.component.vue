<template>
  <div class="main-layout">
    <header-bar />
    <div class="layout-content">
      <left-panel />
      <main class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import HeaderBar from './header-bar.component.vue'
import LeftPanel from './left-panel.component.vue'
</script>

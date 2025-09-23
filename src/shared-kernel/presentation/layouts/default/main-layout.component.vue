<template>
  <div class="main-layout">
    <HeaderBar class="header" />
    <LeftPanel class="left" />
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import HeaderBar from './header-bar.component.vue'
import LeftPanel from './left-panel.component.vue'
</script>

<style scoped>
.main-layout {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    'header header'
    'left content';
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.header {
  grid-area: header;
  width: 100%;
}

.left {
  grid-area: left;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  width: 100%;
}

.page-content {
  grid-area: content;
  padding: 1rem;
  overflow-y: auto;
  width: 100%;
}
</style>

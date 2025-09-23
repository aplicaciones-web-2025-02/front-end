<template>
  <aside class="left-panel" role="navigation" :aria-label="$t('aria.navigation')">
    <ul class="menu" role="menubar">
      <li role="none">
        <RouterLink to="/">Go to Home</RouterLink>
      </li>
      <li role="none">
        <RouterLink to="/about">Go to About</RouterLink>
      </li>
      <li role="none">
        <RouterLink to="/tutorials">Go to tutorials</RouterLink>
      </li>
    </ul>
  </aside>
</template>
<script setup lang="ts"></script>

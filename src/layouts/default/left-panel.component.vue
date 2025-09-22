<template>
  <aside class="left-panel" role="navigation" :aria-label="$t('aria.navigation')">
    <ul class="menu" role="menubar">
      <li role="none">
        <a href="/dashboard" role="menuitem" :aria-label="$t('aria.menu.dashboard')">{{
          $t('layout.menu.dashboard')
        }}</a>
      </li>
      <li role="none">
        <a href="/courses" role="menuitem" :aria-label="$t('aria.menu.courses')">{{
          $t('layout.menu.courses')
        }}</a>
      </li>
      <li role="none">
        <a href="/students" role="menuitem" :aria-label="$t('aria.menu.students')">{{
          $t('layout.menu.students')
        }}</a>
      </li>
      <li role="none">
        <a href="/settings" role="menuitem" :aria-label="$t('aria.menu.settings')">{{
          $t('layout.menu.settings')
        }}</a>
      </li>
    </ul>
  </aside>
</template>

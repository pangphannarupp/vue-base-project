<script setup lang="ts">
import { onMounted } from 'vue';
import { ThemeService } from './services/ThemeService';
import { SettingsService } from './services/SettingsService';

onMounted(() => {
  ThemeService.initTheme();
  SettingsService.init();
});
</script>

<template>
  <router-view />
</template>

<style>
/* Global styles can stay in style.css */
</style>

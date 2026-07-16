<script setup lang="ts">
import { onMounted } from 'vue';
import { ThemeService } from './services/ThemeService';

onMounted(() => {
  ThemeService.initTheme();
});
</script>

<template>
  <router-view />
</template>

<style>
/* Global styles can stay in style.css */
</style>

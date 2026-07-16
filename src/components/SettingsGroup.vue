<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="settings-group">
    <div class="group-title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<style scoped>
.settings-group {
  margin-bottom: 24px;
}

.group-title {
  color: #9e9e9e;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: capitalize;
}
</style>

<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
}>();
</script>

<template>
  <div class="setting-item">
    <span class="item-icon" v-html="icon"></span>
    <span class="item-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.setting-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  color: #333;
}

.item-icon {
  font-size: 1.5rem;
  color: #5d4037;
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.item-icon :deep(svg) {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.item-label {
  font-size: 1.1rem;
}
</style>

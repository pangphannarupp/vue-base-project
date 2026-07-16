<script setup lang="ts">
/**
 * លក្ខណៈដែលត្រូវបញ្ជូនមកកាន់សមាសភាគ (Props for the component)
 */
defineProps<{
  /** រូបតំណាងប្រភេទអត្ថបទ ឬ SVG (Icon string or SVG) */
  icon: string;
  /** ស្លាកឈ្មោះនៃការកំណត់ (Setting label) */
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
  color: var(--primary-theme-color);
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

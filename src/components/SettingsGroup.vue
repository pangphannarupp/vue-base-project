<script setup lang="ts">
/**
 * លក្ខណៈដែលត្រូវបញ្ជូនមកកាន់សមាសភាគ (Props for the component)
 */
defineProps<{
  /** ចំណងជើងក្រុម (Group title) */
  title: string;
}>();
</script>

<template>
  <!-- ក្រុមនៃការកំណត់ (Settings group container) -->
  <div class="settings-group">
    <!-- ចំណងជើងក្រុម (Group title) -->
    <div class="group-title">{{ title }}</div>
    <!-- កន្លែងសម្រាប់បញ្ចូលសមាសភាគរង (Slot for child components) -->
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

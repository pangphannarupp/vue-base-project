<script setup lang="ts">
/**
 * លក្ខណៈដែលត្រូវបញ្ជូនមកកាន់សមាសភាគ (Props for the component)
 */
defineProps<{
  /** ចំណងជើងធំ (Main title) */
  title: string;
  /** ចំណងជើងរង (Subtitle) */
  subtitle: string;
}>();
</script>

<template>
  <!-- ផ្នែកក្បាល (Header section) -->
  <div class="header-section">
    <div class="header-content">
      <!-- បង្ហាញចំណងជើង (Display main title) -->
      <h1>{{ title }}</h1>
      <!-- បង្ហាញចំណងជើងរង (Display subtitle) -->
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <!-- ប៊ូតុងអាប់ដេត (Upgrade button) -->
    <button class="upgrade-btn">
      <span class="star-icon">★</span> Upgrade to PRO
    </button>
  </div>
</template>

<style scoped>
.header-section {
  background-color: var(--primary-theme-color);
  color: white;
  padding: 40px 24px 24px 24px;
  border-bottom-right-radius: 48px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.header-content h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.subtitle {
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.9;
}

.upgrade-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transform: translateY(12px);
}

.star-icon {
  font-size: 1rem;
}
</style>

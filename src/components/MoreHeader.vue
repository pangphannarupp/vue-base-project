<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>

<template>
  <div class="header-section">
    <div class="header-content">
      <h1>{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <button class="upgrade-btn">
      <span class="star-icon">★</span> Upgrade to PRO
    </button>
  </div>
</template>

<style scoped>
.header-section {
  background-color: #d32f2f;
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
  background-color: #fbe9e7;
  color: #d32f2f;
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

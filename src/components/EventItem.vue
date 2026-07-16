<script setup lang="ts">
defineProps<{
  day: string | number;
  dayName?: string;
  eventName: string;
  isGreen?: boolean;
}>();
</script>

<template>
  <div class="event-item">
    <span class="event-date">
      <span class="day" :class="{ 'text-green': isGreen }">{{ day }}</span>
      <span v-if="dayName"> {{ dayName }}</span>
    </span>
    <span class="event-name">{{ eventName }}</span>
  </div>
</template>

<style scoped>
.event-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.event-date {
  width: 80px;
  color: #888;
  font-size: 0.9rem;
}

.event-date .day {
  color: #e53935;
  font-weight: bold;
  font-size: 1.1rem;
}

.event-date .day.text-green {
  color: #00796b;
}

.event-name {
  color: #333;
}
</style>

<script setup lang="ts">
/**
 * លក្ខណៈដែលត្រូវបញ្ជូនមកកាន់សមាសភាគ (Props for the component)
 */
defineProps<{
  /** ថ្ងៃទី (Day number or string) */
  day: string | number;
  /** ឈ្មោះថ្ងៃ (Optional day name) */
  dayName?: string;
  /** ឈ្មោះព្រឹត្តិការណ៍ (Event name) */
  eventName: string;
  /** កំណត់ពណ៌បៃតងសម្រាប់ថ្ងៃពិសេស (Optional flag for green text) */
  isGreen?: boolean;
}>();
</script>

<template>
  <!-- កុងតឺន័រសម្រាប់ព្រឹត្តិការណ៍នីមួយៗ (Container for each event item) -->
  <div class="event-item">
    <!-- ផ្នែកកាលបរិច្ឆេទ (Date section) -->
    <span class="event-date">
      <span class="day" :class="{ 'text-green': isGreen }">{{ day }}</span>
      <span v-if="dayName"> {{ dayName }}</span>
    </span>
    <!-- ឈ្មោះព្រឹត្តិការណ៍ (Event name) -->
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
  color: var(--primary-theme-color);
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 6px;
}

.event-date .day.text-green {
  color: #00796b;
}

.event-name {
  color: #333;
}
</style>

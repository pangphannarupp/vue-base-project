<script setup lang="ts">
import { ref } from 'vue';
import { BizKhmerCalendar } from '@phanna/ui-framework';
import EventItem from '../components/EventItem.vue';

const selectedDate = ref(new Date());

const onDateSelected = (selection: any) => {
  console.log('Selected date:', selection);
};
</script>

<template>
  <div class="month-view">
    <div class="calendar-container">
      <BizKhmerCalendar 
        :initialDate="selectedDate" 
        @date-selected="onDateSelected"
      />
    </div>
    
    <div class="events-section">
      <div class="events-header">
        <h3>ព្រឹត្តិការណ៍</h3>
        <button class="events-nav">1 &gt;</button>
      </div>
      
      <div class="event-list">
        <EventItem day="30" eventName="ចូលព្រះវស្សា" :isGreen="true" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.month-view {
  padding: 0;
  background-color: white;
  color: #333;
  min-height: 100%;
}

.events-section {
  margin-top: 0;
  padding: 0 16px 16px;
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.events-header h3 {
  font-size: 1.1rem;
}

.events-nav {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 4px 12px;
  border-radius: 16px;
  cursor: pointer;
}

.event-list {
  display: flex;
  flex-direction: column;
}
</style>

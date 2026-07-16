<script setup lang="ts">
import { ref, computed } from 'vue';
import { BizSegment, BizSegmentButton, BizYearPickerSheet } from '@phanna/ui-framework';
import EventItem from '../components/EventItem.vue';
import { HolidayService } from '../services/HolidayService';

const currentTab = ref('holidays');
const showYearPicker = ref(false);
const selectedYear = ref(2026);

const holidaysForYear = computed(() => {
  return HolidayService.getHolidays(selectedYear.value);
});

const onYearConfirm = (start: { year: number } | null) => {
  if (start) {
    selectedYear.value = start.year;
  }
  showYearPicker.value = false;
};

const openYearPicker = () => {
  showYearPicker.value = true;
};
</script>

<template>
  <div class="events-view">
    <header class="header">
      <h2>ព្រឹត្តិការណ៍</h2>
      <div class="year-selector" @click.stop="openYearPicker">{{ selectedYear }} <span>&#x25BC;</span></div>
    </header>
    
    <BizSegment v-model="currentTab" class="events-segment">
      <BizSegmentButton value="holidays">ថ្ងៃបុណ្យផ្សេងៗ</BizSegmentButton>
      <BizSegmentButton value="tasks">កិច្ចការ</BizSegmentButton>
    </BizSegment>
    
    <div class="month-group" v-if="currentTab === 'holidays'">
      <template v-for="group in holidaysForYear" :key="group.monthName">
        <h3 class="month-title">{{ group.monthName }}</h3>
        <EventItem 
          v-for="event in group.events" 
          :key="event.id"
          :day="event.day" 
          :dayName="event.dayName" 
          :eventName="event.eventName" 
          :isGreen="event.isGreen" 
        />
      </template>
    </div>
    
    <BizYearPickerSheet 
      v-model="showYearPicker" 
      :initialYear="selectedYear" 
      :showActionButtons="true"
      @confirm="onYearConfirm"
      @cancel="showYearPicker = false"
    />
  </div>
</template>

<style scoped>
.events-view {
  padding: 16px;
  background-color: white;
  color: #333;
  min-height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.year-selector {
  font-weight: bold;
}

.events-segment {
  --biz-segment-btn-padding: 8px 16px;
  --biz-segment-padding: 3px;
  margin-bottom: 24px;
}

.month-title {
  background-color: #fafafa;
  padding: 12px 16px;
  margin: 0 -16px;
  font-size: 1rem;
  font-weight: bold;
  color: #444;
}
</style>

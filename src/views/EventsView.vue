<script setup lang="ts">
import { ref, computed } from 'vue';
import { BizSegment, BizSegmentButton, BizYearPickerSheet } from '@phanna/ui-framework';
import EventItem from '../components/EventItem.vue';
import { HolidayService } from '../services/HolidayService';

/** ផ្ទាំងបច្ចុប្បន្ន (Current active tab) */
const currentTab = ref('holidays');
/** គ្រប់គ្រងការបង្ហាញម៉ឺនុយជ្រើសរើសឆ្នាំ (Toggle year picker sheet) */
const showYearPicker = ref(false);
/** ឆ្នាំដែលបានជ្រើសរើស (Currently selected year) */
const selectedYear = ref(2026);

/** ទាញយកថ្ងៃឈប់សម្រាកផ្អែកលើឆ្នាំដែលបានជ្រើសរើស (Computed holidays for the selected year) */
const holidaysForYear = computed(() => {
  return HolidayService.getHolidays(selectedYear.value);
});

/** អនុម័តការជ្រើសរើសឆ្នាំ (Handle year confirmation) */
const onYearConfirm = (start: { year: number } | null) => {
  if (start) {
    selectedYear.value = start.year;
  }
  showYearPicker.value = false;
};

/** បើកម៉ឺនុយជ្រើសរើសឆ្នាំ (Open the year picker) */
const openYearPicker = () => {
  showYearPicker.value = true;
};
</script>

<template>
  <!-- ទំព័រព្រឹត្តិការណ៍ (Events view container) -->
  <div class="events-view">
    <!-- ផ្នែកក្បាល (Header) -->
    <header class="header">
      <h2>ព្រឹត្តិការណ៍</h2>
      <!-- ឧបករណ៍ជ្រើសរើសឆ្នាំ (Year selector trigger) -->
      <div class="year-selector" @click.stop="openYearPicker">{{ selectedYear }} <span>&#x25BC;</span></div>
    </header>
    
    <!-- ផ្ទាំងផ្លាស់ប្តូរ (Segment tabs) -->
    <BizSegment v-model="currentTab" class="events-segment">
      <BizSegmentButton value="holidays">ថ្ងៃបុណ្យផ្សេងៗ</BizSegmentButton>
      <BizSegmentButton value="tasks">កិច្ចការ</BizSegmentButton>
    </BizSegment>
    
    <!-- បញ្ជីថ្ងៃឈប់សម្រាកតាមខែ (List of holidays grouped by month) -->
    <div class="month-group" v-if="currentTab === 'holidays'">
      <template v-for="group in holidaysForYear" :key="group.monthName">
        <!-- ចំណងជើងខែ (Month title) -->
        <h3 class="month-title">{{ group.monthName }}</h3>
        <!-- រាយព្រឹត្តិការណ៍ (List events) -->
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
    
    <!-- ផ្ទាំងជ្រើសរើសឆ្នាំ (Bottom sheet year picker) -->
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
  color: var(--primary-theme-color);
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

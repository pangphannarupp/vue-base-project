<script setup lang="ts">
import { ref, computed } from 'vue';

import { BizKhmerCalendar, BizBottomSheet, BizNoResult } from '@phanna/ui-framework';
import { KhmerDate } from '@phanna/ui-framework/dist/KhmerDate';
import EventItem from '../components/EventItem.vue';
import KhmerDateCard from '../components/KhmerDateCard.vue';
import ZodiacAnimalCard from '../components/ZodiacAnimalCard.vue';
import { HolidayService } from '../services/HolidayService';




/** កាលបរិច្ឆេទដែលបានជ្រើសរើស (Currently selected date) */
const selectedDate = ref(new Date());
const showSheet = ref(false);

/** តាមដានខែ និងឆ្នាំដែលកំពុងបង្ហាញនៅលើប្រតិទិន (Track currently displayed month/year) */
const displayedYear = ref(selectedDate.value.getFullYear());
const displayedMonth = ref(selectedDate.value.getMonth());

const WEEKDAYS = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
const KHMER_MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

const khmerDateInfo = computed(() => {
  return new KhmerDate(selectedDate.value).toLunar();
});

/** ទាញយកព្រឹត្តិការណ៍សម្រាប់ខែដែលបានជ្រើសរើស (Fetch events for displayed month) */
const currentMonthEvents = computed(() => {
  const year = displayedYear.value;
  // If ui-framework emits 1-12, normalize it to 0-11 for our array.
  // If it emits 0-11 natively, it will map directly.
  const monthIndex = displayedMonth.value > 11 ? displayedMonth.value - 1 : displayedMonth.value;
  
  const monthStr = `${year} ${KHMER_MONTHS[monthIndex]}`;
  const allHolidays = HolidayService.getHolidays(year);
  const monthGroup = allHolidays.find(g => g.monthName === monthStr);
  return monthGroup ? monthGroup.events : [];
});

/** អនុម័តពេលអូសប្តូរខែ (Handle calendar month swipe/change) */
const onMonthChanged = (year: number, month: number) => {
  displayedYear.value = year;
  // Assume component emits 0-11 for month like JS Date, but just in case we normalized above
  displayedMonth.value = month;
};

/** អនុម័តការជ្រើសរើសកាលបរិច្ឆេទ (Handle date selection from calendar) */
const onDateSelected = (selection: any) => {
  if (selection && selection.date instanceof Date) {
    selectedDate.value = selection.date;
  } else if (selection instanceof Date) {
    selectedDate.value = selectedDate.value; // Avoid overwrite reference issue
    selectedDate.value = new Date(selection.getTime());
  }
  
  displayedYear.value = selectedDate.value.getFullYear();
  displayedMonth.value = selectedDate.value.getMonth();
  
  showSheet.value = true;
};



</script>

<template>
  <!-- ទំព័រប្រតិទិនប្រចាំខែ (Month view container) -->
  <div class="month-view">
    <!-- ផ្នែកប្រតិទិន (Calendar section) -->
    <div class="calendar-container">
      <BizKhmerCalendar 
        :initialDate="selectedDate" 
        @date-selected="onDateSelected"
        @month-changed="onMonthChanged"
      />
    </div>
    
    <!-- ផ្នែកព្រឹត្តិការណ៍ខាងក្រោមប្រតិទិន (Events section below calendar) -->
    <div class="events-section">
      <!-- ក្បាលព្រឹត្តិការណ៍ (Events header) -->
      <div class="events-header">
        <h3>ព្រឹត្តិការណ៍</h3>
        <button class="events-nav">{{ currentMonthEvents.length }} &gt;</button>
      </div>
      
      <!-- បញ្ជីព្រឹត្តិការណ៍ (Events list) -->
      <div class="event-list">
        <EventItem 
          v-for="event in currentMonthEvents" 
          :key="event.id"
          :day="event.day" 
          :dayName="event.dayName" 
          :eventName="event.eventName" 
          :isGreen="event.isGreen" 
        />
        <BizNoResult 
          v-if="currentMonthEvents.length === 0" 
          title="គ្មានព្រឹត្តិការណ៍" 
          subtitle="គ្មានព្រឹត្តិការណ៍ក្នុងខែនេះទេ"
        />
      </div>
    </div>

    <!-- ផ្ទាំងបញ្ជូលពីក្រោម (Bottom Sheet for Selected Date) using UI framework -->
    <BizBottomSheet v-model="showSheet">
      <template #header>
        <div class="sheet-header">
        </div>
      </template>
      
      <div class="sheet-content">
        <h2 class="date-large">{{ selectedDate.getDate() }} {{ WEEKDAYS[selectedDate.getDay()] }}</h2>
        <KhmerDateCard :date="selectedDate" :khmerDateInfo="khmerDateInfo" />
        <ZodiacAnimalCard :zodiacYear="khmerDateInfo.zodiacYear" zodiacSecondary="រកា" />
      </div>
    </BizBottomSheet>
  </div>
</template>

<style scoped>
.month-view {
  padding: 0;
  background-color: white;
  color: #333;
  min-height: 100%;
  position: relative;
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

.no-events {
  text-align: center;
  padding: 24px;
  color: var(--text-muted);
}

.sheet-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.icon-btn.add-btn {
  color: var(--primary-theme-color);
}

.icon-btn :deep(svg) {
  width: 28px;
  height: 28px;
  fill: currentColor;
}

.date-large {
  font-size: 2rem;
  font-weight: 500;
  margin: 0 0 24px 0;
  color: #1a1a1a;
  text-align: center;
}

.sheet-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Compact No-Result Component */
.event-list :deep(.biz-no-result) {
  padding: 16px 20px !important;
}

.event-list :deep(.no-result-graphic) {
  margin-bottom: 12px !important;
}

.event-list :deep(.no-result-graphic svg),
.event-list :deep(.no-result-graphic img) {
  width: 80px !important;
  height: 80px !important;
}
</style>

<style>
/* 
  Global overrides for BizKhmerCalendar MonthPickerSheet 
  since the ui-framework package has hardcoded English text.
*/
.picker-headers .picker-col-header {
  font-size: 0 !important;
}
.picker-headers .picker-col-header:nth-child(1)::after {
  content: "ខែ";
  font-size: 16px;
  display: block;
}
.picker-headers .picker-col-header:nth-child(2)::after {
  content: "ឆ្នាំ";
  font-size: 16px;
  display: block;
}

.btn-close-picker {
  font-size: 0 !important;
}
.btn-close-picker::after {
  content: "បិទ";
  font-size: 16px;
}

.btn-confirm-picker {
  font-size: 0 !important;
}
.btn-confirm-picker::after {
  content: "យល់ព្រម";
  font-size: 16px;
}
</style>

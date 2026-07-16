<script setup lang="ts">
import { useRouter } from 'vue-router';
import { KhmerDate } from '@phanna/ui-framework/dist/KhmerDate';
import KhmerDateCard from '../components/KhmerDateCard.vue';
import ZodiacAnimalCard from '../components/ZodiacAnimalCard.vue';

/** កម្មវិធីកំណត់ផ្លូវ (Router instance) */
const router = useRouter();

/** កាលបរិច្ឆេទបច្ចុប្បន្ន (Current date) */
const today = new Date();
/** ព័ត៌មានកាលបរិច្ឆេទចន្ទគតិខ្មែរ (Khmer lunar date information) */
const khmerDateInfo = new KhmerDate(today).toLunar();

/** បញ្ជីឈ្មោះថ្ងៃក្នុងមួយសប្តាហ៍ (List of weekdays) */
const WEEKDAYS = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];

/** ប្តូរទំព័រទៅកាន់ការបន្ថែមព្រឹត្តិការណ៍ថ្មី (Navigate to add new event page) */
const goToAddEvent = () => {
  router.push('/new-task');
};
</script>

<template>
  <!-- ទំព័របង្ហាញកាលបរិច្ឆេទប្រចាំថ្ងៃ (Day view container) -->
  <div class="day-view">
    <!-- ផ្នែកក្បាល (Header) -->
    <header class="header">
      <h2>ថ្ងៃ</h2>
      <!-- ប៊ូតុងបន្ថែមព្រឹត្តិការណ៍ (Add event button) -->
      <button class="add-button" @click="goToAddEvent">+</button>
    </header>
    
    <!-- ខ្លឹមសារចម្បង (Main content) -->
    <main class="main-content">
      <!-- បង្ហាញកាលបរិច្ឆេទធំៗ (Large date display) -->
      <h1 class="date-large">{{ String(today.getDate()).padStart(2, '0') }} {{ WEEKDAYS[today.getDay()] }}</h1>
      
      <!-- កាតកាលបរិច្ឆេទខ្មែរ (Khmer date card component) -->
      <KhmerDateCard :date="today" :khmerDateInfo="khmerDateInfo" />
      
      <!-- កាតសត្វតំណាងឆ្នាំ (Zodiac animal card component) -->
      <ZodiacAnimalCard :zodiacYear="khmerDateInfo.zodiacYear" />
    </main>
  </div>
</template>

<style scoped>
.day-view {
  padding: 16px;
  background-color: white;
  color: #333;
  min-height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.add-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--primary-theme-color);
  cursor: pointer;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.date-large {
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 20px;
}
</style>

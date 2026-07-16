<script setup lang="ts">
import { useRouter } from 'vue-router';
import { KhmerDate } from '@phanna/ui-framework/dist/KhmerDate';
import KhmerDateCard from '../components/KhmerDateCard.vue';
import ZodiacAnimalCard from '../components/ZodiacAnimalCard.vue';

const router = useRouter();

const today = new Date();
const khmerDateInfo = new KhmerDate(today).toLunar();

const WEEKDAYS = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];

const goToAddEvent = () => {
  router.push('/new-task');
};
</script>

<template>
  <div class="day-view">
    <header class="header">
      <h2>ថ្ងៃ</h2>
      <button class="add-button" @click="goToAddEvent">+</button>
    </header>
    
    <main class="main-content">
      <h1 class="date-large">{{ String(today.getDate()).padStart(2, '0') }} {{ WEEKDAYS[today.getDay()] }}</h1>
      
      <KhmerDateCard :date="today" :khmerDateInfo="khmerDateInfo" />
      
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
  color: #e53935;
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

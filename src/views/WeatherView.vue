<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WeatherCard from '../components/WeatherCard.vue';
import { WeatherService, type WeatherLocation } from '../services/WeatherService';

/** បញ្ជីទីតាំងអាកាសធាតុ (List of weather locations) */
const locations = ref<WeatherLocation[]>([]);
/** ស្ថានភាពកំពុងផ្ទុកទិន្នន័យ (Loading state flag) */
const isLoading = ref(true);

/** ទាញយកទិន្នន័យនៅពេលសមាសភាគត្រូវបានភ្ជាប់ (Fetch data on component mount) */
onMounted(async () => {
  isLoading.value = true;
  locations.value = await WeatherService.getLocations();
  isLoading.value = false;
});
</script>

<template>
  <!-- ទំព័រអាកាសធាតុ (Weather view container) -->
  <div class="weather-view">
    <!-- ផ្នែកក្បាល (Header) -->
    <header class="header">
      <h2>អាកាសធាតុ</h2>
    </header>
    
    <!-- បង្ហាញនៅពេលកំពុងផ្ទុក (Show loading state) -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>កំពុងផ្ទុកទិន្នន័យ...</p>
    </div>
    <!-- បង្ហាញកាតអាកាសធាតុ (Show weather cards) -->
    <div v-else class="cards-container">
      <WeatherCard 
        v-for="loc in locations" 
        :key="loc.id"
        :location="loc"
      />
    </div>
  </div>
</template>

<style scoped>
.weather-view {
  padding: 16px;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: normal;
}

.add-location-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: var(--text-muted);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary-theme-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

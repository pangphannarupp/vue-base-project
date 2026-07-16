<script setup lang="ts">
import WeatherCard from '../components/WeatherCard.vue';

const locations = [
  {
    id: 1,
    name: 'ភ្នំពេញ', // Phnom Penh
    temp: 'NA',
    image: 'https://images.unsplash.com/photo-1581451528825-968b5ce53b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    weather: '?'
  },
  {
    id: 2,
    name: 'សៀមរាប', // Siem Reap
    temp: 'NA',
    image: 'https://images.unsplash.com/photo-1560961803-057d2a5a544b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    weather: '?'
  },
  {
    id: 3,
    name: 'ព្រះសីហនុ', // Sihanoukville
    temp: 'NA',
    image: 'https://images.unsplash.com/photo-1596700685934-45300d075217?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    weather: '?'
  }
];
</script>

<template>
  <div class="weather-view">
    <header class="header">
      <h2>អាកាសធាតុ</h2>
      <button class="add-location-btn">
        <span class="icon">🏠+</span>
      </button>
    </header>
    
    <div class="cards-container">
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
  background-color: #1c2331;
  min-height: 100vh;
  color: white;
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
</style>

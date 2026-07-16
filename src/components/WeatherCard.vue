<script setup lang="ts">
defineProps<{
  location: {
    id: number;
    name: string;
    temp: string;
    image: string;
    weather: string;
  }
}>();
</script>

<template>
  <div 
    class="weather-card"
    :style="{ backgroundImage: `url(${location.image})` }"
  >
    <div class="card-overlay">
      <div class="top-row">
        <span class="weather-icon">{{ location.weather }}</span>
      </div>
      <div class="temp">{{ location.temp }}</div>
      <div class="bottom-row">
        <h3 class="location-name">{{ location.name }}</h3>
        <span class="status">NA</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  height: 160px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.card-overlay {
  background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%);
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.weather-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.temp {
  font-size: 3rem;
  line-height: 1;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.location-name {
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
}

.status {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>

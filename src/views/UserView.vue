<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserViewModel } from '../viewmodels/useUserViewModel';

const { user, isLoading, error, loadUser } = useUserViewModel();

onMounted(() => {
  loadUser('user-1');
});
</script>

<template>
  <div class="user-card">
    <div v-if="isLoading" class="loading-state">
      Loading user data...
    </div>
    
    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>

    <div v-else-if="user" class="user-details">
      <img :src="user.avatarUrl" alt="Avatar" class="avatar" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      
      <button class="btn-refresh" @click="loadUser('user-1')">
        Refresh
      </button>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  background: var(--surface-color, #ffffff);
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  margin: 40px auto;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #e0e0e0;
}

h2 {
  margin: 0 0 8px 0;
  color: var(--text-color, #333);
  font-family: 'Inter', sans-serif;
}

p {
  margin: 0 0 24px 0;
  color: var(--text-muted, #666);
}

.btn-refresh {
  background-color: #646cff;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.btn-refresh:hover {
  background-color: #535bf2;
}

.loading-state, .error-state {
  color: var(--text-muted, #666);
  padding: 40px 0;
}
</style>

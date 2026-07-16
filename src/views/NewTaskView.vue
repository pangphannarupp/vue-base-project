<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const taskTitle = ref('');
const time = ref('ថ្ងៃនេះ, 9:11 PM');

const goBack = () => {
  router.back();
};

const saveTask = () => {
  console.log('Task saved:', taskTitle.value, time.value);
  router.back();
};
</script>

<template>
  <div class="new-task-view">
    <header class="header">
      <button class="back-btn" @click="goBack">&larr;</button>
      <h2>កិច្ចការថ្មី</h2>
    </header>
    
    <div class="form-container">
      <!-- Fallback to raw inputs if BizInput fails to render without required props -->
      <input 
        v-model="taskTitle"
        class="task-input"
        placeholder="បញ្ចូលចំណងជើង"
      />
      
      <div class="time-selector">
        <span class="icon">&#x1F551;</span>
        <span class="time-text">{{ time }}</span>
      </div>
    </div>
    
    <div class="bottom-action">
      <button class="save-btn" @click="saveTask">រក្សាទុក</button>
    </div>
  </div>
</template>

<style scoped>
.new-task-view {
  padding: 16px;
  background-color: white;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

.header h2 {
  font-size: 1.2rem;
  font-weight: normal;
  color: #333;
  margin: 0;
}

.form-container {
  flex: 1;
}

.task-input {
  width: 100%;
  border: none;
  font-size: 1.25rem;
  color: #ccc; /* Placeholder style */
  margin-bottom: 24px;
  outline: none;
}

.task-input:focus {
  color: #333;
}

.time-selector {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #eee;
  border-radius: 20px;
  background-color: #fafafa;
}

.time-text {
  color: #333;
}

.bottom-action {
  padding: 16px 0;
}

.save-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 24px;
  background-color: #e0e0e0;
  color: #888;
  font-size: 1rem;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #d0d0d0;
}
</style>

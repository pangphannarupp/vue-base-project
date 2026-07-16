<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/** កម្មវិធីកំណត់ផ្លូវ (Router instance) */
const router = useRouter();
/** ចំណងជើងកិច្ចការ (Task title) */
const taskTitle = ref('');
/** ពេលវេលាកិច្ចការ (Task time) */
const time = ref('ថ្ងៃនេះ, 9:11 PM');

/** ត្រឡប់ទៅទំព័រមុន (Navigate back) */
const goBack = () => {
  router.back();
};

/** រក្សាទុកកិច្ចការថ្មី (Save new task) */
const saveTask = () => {
  console.log('Task saved:', taskTitle.value, time.value);
  router.back();
};
</script>

<template>
  <!-- ទំព័របង្កើតកិច្ចការថ្មី (New task view container) -->
  <div class="new-task-view">
    <!-- ផ្នែកក្បាល (Header) -->
    <header class="header">
      <!-- ប៊ូតុងត្រឡប់ក្រោយ (Back button) -->
      <button class="back-btn" @click="goBack">&larr;</button>
      <h2>កិច្ចការថ្មី</h2>
    </header>
    
    <!-- ទម្រង់បញ្ចូលទិន្នន័យ (Form container) -->
    <div class="form-container">
      <!-- ប្រអប់បញ្ចូលចំណងជើងកិច្ចការ (Task title input field) -->
      <input 
        v-model="taskTitle"
        class="task-input"
        placeholder="បញ្ចូលចំណងជើង"
      />
      
      <!-- ឧបករណ៍ជ្រើសរើសម៉ោង (Time selector) -->
      <div class="time-selector">
        <span class="icon">&#x1F551;</span>
        <span class="time-text">{{ time }}</span>
      </div>
    </div>
    
    <!-- សកម្មភាពផ្នែកខាងក្រោម (Bottom action area) -->
    <div class="bottom-action">
      <!-- ប៊ូតុងរក្សាទុក (Save button) -->
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

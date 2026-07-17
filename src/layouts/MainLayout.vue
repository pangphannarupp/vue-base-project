<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Assume the framework exports these components
import { BizBottomNav } from '@phanna/ui-framework';

const route = useRoute();
const router = useRouter();

import { calendarOutline, calendar, listOutline, list, cloudOutline, cloud, ellipsisHorizontalOutline, ellipsisHorizontal } from 'ionicons/icons';

const items = [
  { value: 'day', label: 'ថ្ងៃ', icon: calendarOutline, activeIcon: calendar },
  { value: 'month', label: 'ខែ', icon: calendarOutline, activeIcon: calendar },
  { value: 'events', label: 'ព្រឹត្តិការណ៍', icon: listOutline, activeIcon: list },
  { value: 'weather', label: 'អាកាសធាតុ', icon: cloudOutline, activeIcon: cloud },
  { value: 'more', label: 'ផ្សេងទៀត', icon: ellipsisHorizontalOutline, activeIcon: ellipsisHorizontal },
];

const activeTab = ref(route.name as string || 'day');

watch(() => route.name, (newName) => {
  if (newName && ['day', 'month', 'events', 'weather', 'more'].includes(newName as string)) {
    activeTab.value = newName as string;
  }
});

const onTabChange = (tabId: string) => {
  activeTab.value = tabId;
  router.push({ name: tabId });
};
</script>

<template>
  <div class="main-layout">
    <div class="content-area">
      <router-view />
    </div>
    
    <BizBottomNav 
      :items="items" 
      :modelValue="activeTab" 
      @update:modelValue="onTabChange" 
    />
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.content-area {
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding-bottom: 70px; /* Space for bottom nav */
}
</style>

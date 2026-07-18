<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Assume the framework exports these components
import { BizBottomNav, BizNavigationRail } from '@phanna/ui-framework';

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

const railItems = computed(() => {
  return items.map(item => ({
    label: item.label,
    icon: activeTab.value === item.value ? item.activeIcon : item.icon,
    active: activeTab.value === item.value,
    value: item.value
  }));
});

const onRailClick = (item: any) => {
  if (item && item.value) {
    onTabChange(item.value);
  }
};
</script>

<template>
  <div class="main-layout">
    <!-- Desktop/Tablet Sidebar Navigation (BizNavigationRail) -->
    <BizNavigationRail 
      class="desktop-sidebar"
      :items="railItems" 
      @item-click="onRailClick" 
    >
      <template #header>
        <div class="sidebar-logo">
          <h2>ប្រតិទិនឆ្លាតវៃ</h2>
        </div>
      </template>
    </BizNavigationRail>

    <div class="content-area">
      <div class="content-container">
        <router-view />
      </div>
    </div>
    
    <BizBottomNav 
      class="mobile-bottom-nav"
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

.desktop-sidebar {
  display: none !important;
}

.content-area {
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding-bottom: 70px; /* Space for bottom nav */
}

.content-container {
  width: 100%;
}

/* Tablet & Desktop Responsive Layout */
@media (min-width: 768px) {
  .main-layout {
    flex-direction: row;
  }

  .mobile-bottom-nav {
    display: none !important;
  }

  .desktop-sidebar {
    display: flex !important;
    background-color: var(--surface-color, #ffffff);
    box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  }

  .sidebar-logo {
    padding: 24px 0;
  }

  .sidebar-logo h2 {
    margin: 0;
    font-size: 1rem;
    color: var(--biz-primary, #646cff);
    font-weight: bold;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  .content-area {
    padding-bottom: 0; /* Remove bottom nav space */
    background-color: #f8fafc; /* Slight contrast from sidebar */
  }

  /* Constrain main content so it doesn't stretch too thin */
  .content-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
    background-color: var(--surface-color, #ffffff);
    min-height: 100%;
    box-shadow: 0 0 10px rgba(0,0,0,0.02);
  }
}

/* Optional Desktop Breakpoint adjustment */
@media (min-width: 1024px) {
  .content-container {
    max-width: 900px;
  }
}
</style>

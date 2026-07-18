<script setup lang="ts">
import { ref, watch } from 'vue';
import { BizBottomSheet, BizDynamicIsland } from '@phanna/ui-framework';
import { SettingsService } from '../services/SettingsService';

/**
 * Props for the WeekStartPicker component.
 * @property {boolean} modelValue - Controls the visibility of the picker.
 * @property {string} popupStyle - Determines the visual style of the popup ('sheet', 'alert', or 'island').
 */
const props = defineProps<{
  modelValue: boolean;
  popupStyle: string; // 'sheet' | 'alert' | 'island'
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();

const closePicker = () => {
  emit('update:modelValue', false);
};

/**
 * Persists the user's selected first day of the week to global settings and closes the picker.
 * @param {number} day - The index of the day (0 for Sunday, 1 for Monday).
 */
const selectWeekStart = (day: number) => {
  SettingsService.setFirstDayOfWeek(day);
  closePicker();
};

// --- Island State Machine ---

/** Controls the visibility of the internal island component */
const internalIslandShow = ref(false);
/** Manages the animation state of the island ('minimal' or 'expanded') */
const islandState = ref('minimal');

/** Timeout reference for the expansion animation */
let expandTimeout: any;
/** Timeout reference for the closing animation */
let closeTimeout: any;

/**
 * Watcher on the v-model to coordinate the island's entry/exit animations.
 */

watch(() => props.modelValue, (val) => {
  if (props.popupStyle !== 'island') return;
  if (val) {
    internalIslandShow.value = true;
    islandState.value = 'minimal';
    clearTimeout(closeTimeout);
    clearTimeout(expandTimeout);
    expandTimeout = setTimeout(() => {
      islandState.value = 'expanded';
    }, 400);
  } else {
    if (internalIslandShow.value) {
      islandState.value = 'minimal';
      clearTimeout(expandTimeout);
      clearTimeout(closeTimeout);
      closeTimeout = setTimeout(() => {
        internalIslandShow.value = false;
      }, 400);
    }
  }
}, { immediate: true });

const handleIslandUpdate = (val: boolean) => {
  if (!val) {
    emit('update:modelValue', false);
  } else {
    internalIslandShow.value = val;
  }
};
</script>

<template>
  <!-- SHEET -->
  <BizBottomSheet v-if="popupStyle === 'sheet'" :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div style="padding: 24px 16px;">
      <h3 class="picker-title">ជ្រើសរើសថ្ងៃផ្តើមនៃសប្តាហ៍</h3>
      <div class="week-start-options">
        <button class="setting-select-btn" :class="{ active: SettingsService.firstDayOfWeek.value === 1 }" @click="selectWeekStart(1)">ថ្ងៃច័ន្ទ (Monday)</button>
        <button class="setting-select-btn" :class="{ active: SettingsService.firstDayOfWeek.value === 0 }" @click="selectWeekStart(0)">ថ្ងៃអាទិត្យ (Sunday)</button>
      </div>
    </div>
  </BizBottomSheet>

  <!-- ALERT -->
  <div v-if="popupStyle === 'alert' && modelValue" class="custom-alert-overlay" @click="closePicker">
    <div class="custom-alert-content" @click.stop>
      <div class="alert-header">
        <h3 class="picker-title">ជ្រើសរើសថ្ងៃផ្តើមនៃសប្តាហ៍</h3>
      </div>
      <div class="alert-body">
        <div class="week-start-options">
          <button class="setting-select-btn" :class="{ active: SettingsService.firstDayOfWeek.value === 1 }" @click="selectWeekStart(1)">ថ្ងៃច័ន្ទ (Monday)</button>
          <button class="setting-select-btn" :class="{ active: SettingsService.firstDayOfWeek.value === 0 }" @click="selectWeekStart(0)">ថ្ងៃអាទិត្យ (Sunday)</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ISLAND -->
  <div v-if="popupStyle === 'island'">
    <BizDynamicIsland 
      :modelValue="internalIslandShow"
      :state="islandState"
      wrapperClass="week-start-island"
      @update:modelValue="handleIslandUpdate"
      bgColor="#ffffff"
      textColor="#333333"
    >
      <template #minimal v-if="islandState === 'minimal'">
        <div class="calendar-minimal-dot"></div>
      </template>

      <template #expanded-body v-if="islandState === 'expanded'">
        <div class="calendar-island-body">
          <h3 class="picker-title" style="padding: 0 16px 16px;">ជ្រើសរើសថ្ងៃផ្តើមនៃសប្តាហ៍</h3>
          <div style="padding: 0 16px 16px;">
            <div class="week-start-options">
              <button class="setting-select-btn" :class="{ active: SettingsService.firstDayOfWeek.value === 1 }" @click="selectWeekStart(1)">ថ្ងៃច័ន្ទ (Monday)</button>
              <button class="setting-select-btn" :class="{ active: SettingsService.firstDayOfWeek.value === 0 }" @click="selectWeekStart(0)">ថ្ងៃអាទិត្យ (Sunday)</button>
            </div>
          </div>
        </div>
      </template>
    </BizDynamicIsland>
  </div>
</template>

<style scoped>
.picker-title {
  margin: 0 0 24px 0;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.week-start-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-select-btn {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #f9f9f9;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-family: inherit;
  color: #333;
}
.setting-select-btn.active {
  background: color-mix(in srgb, var(--primary-theme-color) 10%, transparent);
  border-color: var(--primary-theme-color);
  color: var(--primary-theme-color);
  font-weight: 600;
}

/* Alert Styles */
.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.custom-alert-content {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}
.alert-header {
  padding: 24px 20px 8px;
}
.alert-header .picker-title {
  margin-bottom: 0;
}
.alert-body {
  padding: 16px 20px 24px;
}

/* Island Styles */
.calendar-island-body {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  background: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}
.calendar-minimal-dot {
  width: 16px;
  height: 16px;
  background-color: var(--primary-theme-color, #e53935);
  border-radius: 50%;
}
</style>

<style>
/* Global overrides for the island wrapper */
.week-start-island {
  --biz-island-expanded-width: 320px;
  --biz-island-expanded-height: 320px;
  --biz-island-expanded-radius: 24px;
}
</style>

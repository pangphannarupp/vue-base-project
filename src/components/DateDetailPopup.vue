<script setup lang="ts">
import { ref, watch } from 'vue';
import { BizBottomSheet, BizDynamicIsland } from '@phanna/ui-framework';
import KhmerDateCard from './KhmerDateCard.vue';
import ZodiacAnimalCard from './ZodiacAnimalCard.vue';

/**
 * Props for the DateDetailPopup component.
 * @property {boolean} modelValue - Controls the visibility of the popup (v-model).
 * @property {string} popupStyle - Determines the visual style of the popup ('sheet', 'alert', or 'island').
 * @property {Date} selectedDate - The Gregorian date selected by the user.
 * @property {any} khmerDateInfo - The computed Khmer lunar date object associated with the selected date.
 * @property {string[]} WEEKDAYS - Localized array of weekday names.
 */

const props = defineProps<{
  modelValue: boolean;
  popupStyle: string; // 'sheet' | 'alert' | 'island'
  selectedDate: Date;
  khmerDateInfo: any;
  WEEKDAYS: string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();

const closePopup = () => {
  emit('update:modelValue', false);
};

// --- Island State Machine ---

/** Controls the visibility of the internal island component without destroying it */
const internalIslandShow = ref(false);
/** Manages the animation state of the island ('minimal' or 'expanded') */
const islandState = ref('minimal');

/** Timeout reference for the expansion animation */
let expandTimeout: any;
/** Timeout reference for the closing animation */
let closeTimeout: any;

/**
 * Watcher on the v-model to coordinate the island's entry/exit animations.
 * Ensures the opposing timeouts are cleared to prevent state desync if the user rapidly clicks.
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
    <div class="sheet-content">
      <h2 class="date-large">{{ selectedDate.getDate() }} {{ WEEKDAYS[selectedDate.getDay()] }}</h2>
      <KhmerDateCard :date="selectedDate" :khmerDateInfo="khmerDateInfo" />
      <ZodiacAnimalCard :zodiacYear="khmerDateInfo.zodiacYear" zodiacSecondary="រកា" />
    </div>
  </BizBottomSheet>

  <!-- ALERT -->
  <div v-if="popupStyle === 'alert' && modelValue" class="custom-alert-overlay" @click="closePopup">
    <div class="custom-alert-content" @click.stop>
      <div class="alert-body">
        <h2 class="date-large">{{ selectedDate.getDate() }} {{ WEEKDAYS[selectedDate.getDay()] }}</h2>
        <KhmerDateCard :date="selectedDate" :khmerDateInfo="khmerDateInfo" />
        <ZodiacAnimalCard :zodiacYear="khmerDateInfo.zodiacYear" zodiacSecondary="រកា" />
      </div>
    </div>
  </div>

  <!-- ISLAND -->
  <div v-if="popupStyle === 'island'">
    <BizDynamicIsland 
      :modelValue="internalIslandShow"
      :state="islandState"
      wrapperClass="date-detail-island"
      @update:modelValue="handleIslandUpdate"
      bgColor="#ffffff"
      textColor="#333333"
    >
      <template #minimal v-if="islandState === 'minimal'">
        <div class="calendar-minimal-dot"></div>
      </template>

      <template #expanded-body v-if="islandState === 'expanded'">
        <div class="calendar-island-body">
          <h2 class="date-large">{{ selectedDate.getDate() }} {{ WEEKDAYS[selectedDate.getDay()] }}</h2>
          <KhmerDateCard :date="selectedDate" :khmerDateInfo="khmerDateInfo" />
          <ZodiacAnimalCard :zodiacYear="khmerDateInfo.zodiacYear" zodiacSecondary="រកា" />
        </div>
      </template>
    </BizDynamicIsland>
  </div>
</template>

<style scoped>
.date-large {
  font-size: 2rem;
  font-weight: 500;
  margin: 0 0 24px 0;
  color: #1a1a1a;
  text-align: center;
}
.sheet-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
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
.alert-body {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Island Styles */
.calendar-island-body {
  width: 100%;
  height: 100%;
  padding: 24px 16px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  overflow-y: auto;
}
.calendar-island-body::-webkit-scrollbar {
  display: none;
}
.calendar-minimal-dot {
  width: 16px;
  height: 16px;
  background-color: var(--primary-theme-color, #e53935);
  border-radius: 50%;
}
</style>
<style>
.date-detail-island {
  --biz-island-expanded-width: 340px;
  --biz-island-expanded-height: 580px;
  --biz-island-expanded-radius: 24px;
}
</style>

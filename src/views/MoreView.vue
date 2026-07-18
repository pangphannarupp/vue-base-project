<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  BizColorPickerSheet, 
  BizColorPickerAlert, 
  BizColorPickerIsland,
  BizCollapsingToolbar,
  BizSegment,
  BizSegmentButton
} from '@phanna/ui-framework';
import {
  moonOutline, 
  calendarOutline, 
  alarmOutline, 
  globeOutline,
  timeOutline,
  cloudOutline,
  thumbsUpOutline,
  chatboxEllipsesOutline,
  shareSocialOutline,
  informationCircleOutline,
  starOutline,
  albumsOutline,
  alertCircleOutline,
  phonePortraitOutline
} from 'ionicons/icons';
import SettingsGroup from '../components/SettingsGroup.vue';
import SettingItem from '../components/SettingItem.vue';
import WeekStartPicker from '../components/WeekStartPicker.vue';
import { ThemeService } from '../services/ThemeService';
import { SettingsService } from '../services/SettingsService';
import { KhmerDate } from '@phanna/ui-framework/dist/KhmerDate';
import vueSvg from '../assets/vue.svg';

/** 
 * Computes the localized Khmer date details for the current date.
 * Used for the subtitle in the collapsing header.
 */
const khmerDateInfo = computed(() => {
  return new KhmerDate(new Date()).toLunar();
});

/** Formats the Khmer lunar date info into a readable subtitle string */
const subtitleText = computed(() => {
  const info = khmerDateInfo.value;
  return `ឆ្នាំ${info.zodiacYear} ${info.stem} ព.ស. ${info.lunarYear}`;
});

/** បំប្លែងទម្រង់រូបតំណាង SVG (Render/clean SVG icon string) */
const renderIcon = (iconStr: string) => {
  if (iconStr.startsWith('data:image/svg+xml;utf8,')) {
    return iconStr.replace('data:image/svg+xml;utf8,', '');
  }
  return iconStr;
};

/** 
 * ស្ថានភាពបង្ហាញម៉ឺនុយជ្រើសរើសពណ៌ (Theme picker modal state) 
 * Controls the visibility of the Color Picker.
 */
const showThemePicker = ref(false);
/** Tracks the currently selected theme color for the UI binding */
const currentThemeColor = ref(ThemeService.getCurrentColor());

/** Controls the visibility of the Week Start configuration picker */
const showWeekStartPicker = ref(false);

/** 
 * ទម្រង់នៃការបង្ហាញម៉ឺនុយ (Popup display style) 
 * Two-way binding for the popup style preference ('sheet', 'alert', 'island').
 * Reads from and writes to the global SettingsService.
 */
const popupStyle = computed({
  get: () => SettingsService.popupStyle.value,
  set: (val: string) => SettingsService.setPopupStyle(val)
});

/** បញ្ជីពណ៌ (List of colors from ThemeService) */
const themeColors = ThemeService.THEME_COLORS;

/** បើកម៉ឺនុយ (Open modal) */
const openThemePicker = () => {
  showThemePicker.value = true;
};

/** ជ្រើសរើសពណ៌ស្បែកថ្មី (Select a new theme color) */
const selectTheme = (color: string) => {
  ThemeService.setTheme(color);
  currentThemeColor.value = color;
  showThemePicker.value = false;
};
</script>

<template>
  <!-- ទំព័រការកំណត់បន្ថែម (More settings view container) -->
  <div class="more-view">
    <BizCollapsingToolbar
      :expandedHeight="200"
      :collapsedHeight="60"
      :centerTitleOnCollapse="false"
    >
      <template #background>
        <div class="header-bg"></div>
      </template>

      <template #title>
        <div class="title-with-profile">
          <img :src="vueSvg" alt="Profile" class="profile-avatar-inline" />
          <div class="custom-title">
            <h1>ប្រតិទិនឆ្លាតវៃ</h1>
            <p class="subtitle">{{ subtitleText }}</p>
          </div>
        </div>
      </template>

      <!-- ខ្លឹមសារនៃការកំណត់ (Settings content) -->
      <div class="settings-content">
        <!-- ក្រុមការកំណត់ទម្រង់ (Popup Style Setting) -->
        <SettingsGroup title="Popup Style">
          <div style="padding: 0 16px 16px;">
            <BizSegment v-model="popupStyle">
              <BizSegmentButton value="sheet">
                <template #icon><span v-html="renderIcon(albumsOutline)" class="segment-icon-wrapper"></span></template>
                ផ្ទាំង
              </BizSegmentButton>
              <BizSegmentButton value="alert">
                <template #icon><span v-html="renderIcon(alertCircleOutline)" class="segment-icon-wrapper"></span></template>
                សារប្រាប់
              </BizSegmentButton>
              <BizSegmentButton value="island">
                <template #icon><span v-html="renderIcon(phonePortraitOutline)" class="segment-icon-wrapper"></span></template>
                កោះ
              </BizSegmentButton>
            </BizSegment>
          </div>
        </SettingsGroup>

        <!-- ក្រុមការកំណត់ប្រតិទិន (Calendar Setting Group) -->
        <SettingsGroup title="Calendar Setting">
          <div @click="openThemePicker" class="clickable-setting">
            <SettingItem :icon="renderIcon(moonOutline)" label="ផ្លាស់ប្តូរស្បែក" />
          </div>
          <div class="clickable-setting" @click="showWeekStartPicker = true">
            <SettingItem :icon="renderIcon(calendarOutline)" label="ថ្ងៃផ្តើមនៃសប្តាហ៍" />
          </div>
          <SettingItem :icon="renderIcon(alarmOutline)" label="កំណត់ការជូនដំណឹង" />
          <SettingItem :icon="renderIcon(globeOutline)" label="ប្ដូរភាសា" />
        </SettingsGroup>

        <!-- ក្រុមទិន្នន័យ និងឧបករណ៍ (Data & Tool Group) -->
        <SettingsGroup title="Data & Tool">
          <SettingItem :icon="renderIcon(timeOutline)" label="គណនារយៈពេល" />
          <SettingItem :icon="renderIcon(cloudOutline)" label="បម្រុងទុក / ស្ដារ" />
        </SettingsGroup>

        <!-- ក្រុមគាំទ្រយើង (Support Us Group) -->
        <SettingsGroup title="Support Us">
          <SettingItem :icon="renderIcon(thumbsUpOutline)" label="Facebook" />
          <SettingItem :icon="renderIcon(chatboxEllipsesOutline)" label="មតិ និងការវាយតម្លៃ" />
          <SettingItem :icon="renderIcon(shareSocialOutline)" label="ចែករំលែក" />
        </SettingsGroup>

        <!-- ក្រុមអំពីកម្មវិធី (About App Group) -->
        <SettingsGroup title="អំពីកម្មវិធី">
          <SettingItem :icon="renderIcon(informationCircleOutline)" label="អំពីកម្មវិធី" />
          <SettingItem :icon="renderIcon(starOutline)" label="មុខងារថ្មី" />
        </SettingsGroup>
      </div>
    </BizCollapsingToolbar>

    <WeekStartPicker 
      v-model="showWeekStartPicker" 
      :popupStyle="popupStyle" 
    />

    <!-- ម៉ឺនុយជ្រើសរើសស្បែកពណ៌ (Theme Picker Bottom Sheet) using UI framework -->
    <BizColorPickerSheet 
      v-if="popupStyle === 'sheet'"
      v-model="showThemePicker"
      :colorValue="currentThemeColor"
      title="ជ្រើសរើសពណ៌ស្បែក"
      :colors="themeColors"
      :showActionButtons="true"
      cancelText="បោះបង់"
      confirmText="យល់ព្រម"
      @update:colorValue="selectTheme"
    />

    <!-- ម៉ឺនុយជ្រើសរើសស្បែកពណ៌ជាប្រភេទ Alert (Theme Picker Alert) -->
    <BizColorPickerAlert 
      v-if="popupStyle === 'alert'"
      v-model="showThemePicker"
      :colorValue="currentThemeColor"
      title="ជ្រើសរើសពណ៌ស្បែក"
      :colors="themeColors"
      :showActionButtons="true"
      cancelText="បោះបង់"
      confirmText="យល់ព្រម"
      @update:colorValue="selectTheme"
    />

    <!-- ម៉ឺនុយជ្រើសរើសស្បែកពណ៌ជាប្រភេទ Island (Theme Picker Island) -->
    <BizColorPickerIsland 
      v-if="popupStyle === 'island'"
      v-model="showThemePicker"
      :colorValue="currentThemeColor"
      title="ជ្រើសរើសពណ៌ស្បែក"
      :colors="themeColors"
      :showActionButtons="true"
      cancelText="បោះបង់"
      confirmText="យល់ព្រម"
      @update:colorValue="selectTheme"
    />
  </div>
</template>

<style scoped>
/* Fix SVG icon vertical alignment inside slots */
.segment-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Fix ionicons outline variants rendering as solid shapes by providing missing ionicon classes */
:deep(.ionicon-fill-none) {
  fill: none !important;
}
:deep(.ionicon-stroke-width) {
  stroke-width: 32px !important;
  stroke: currentColor !important;
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
}
.setting-select-btn.active {
  background: color-mix(in srgb, var(--primary-theme-color) 10%, transparent);
  border-color: var(--primary-theme-color);
  color: var(--primary-theme-color);
  font-weight: 600;
}

.more-view {
  background-color: #ffffff;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

/* Background for the collapsing header */
.header-bg {
  height: 100%;
  width: 100%;
  background-color: var(--primary-theme-color);
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
    url('https://static.vecteezy.com/system/resources/thumbnails/006/662/397/small/cambodia-famous-landmark-silhouette-style-with-text-inside-vector.jpg');
  background-size: cover;
  background-position: center bottom;
  background-blend-mode: overlay;
}

/* Custom Title and Profile Layout */
.title-with-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Fix framework scaling overlap by changing transform origin to bottom.
   This forces the scaled text to expand upwards instead of downwards,
   keeping it strictly within the orange header bounds. */
.more-view :deep(.biz-collapsing-title) {
  transform-origin: left bottom !important;
}

.profile-avatar-inline {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.custom-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
}

.custom-title h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.subtitle {
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.9;
}

.upgrade-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 20px;
  color: white;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  backdrop-filter: blur(4px);
}

.upgrade-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.star-icon {
  color: #FFD700;
  font-size: 1.1rem;
}

.settings-content {
  padding: 24px 24px 94px 24px; /* 94px = 24px original padding + 70px bottom nav */
}

.clickable-setting {
  cursor: pointer;
}


</style>

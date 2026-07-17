<script setup lang="ts">
import { ref, computed } from 'vue';
import { BizColorPickerSheet, BizCollapsingToolbar } from '@phanna/ui-framework';
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
  starOutline
} from 'ionicons/icons';
import SettingsGroup from '../components/SettingsGroup.vue';
import SettingItem from '../components/SettingItem.vue';
import { ThemeService } from '../services/ThemeService';
import { KhmerDate } from '@phanna/ui-framework/dist/KhmerDate';
import vueSvg from '../assets/vue.svg';

/** ព័ត៌មានកាលបរិច្ឆេទចន្ទគតិខ្មែរ (Khmer lunar date information) */
const khmerDateInfo = computed(() => {
  return new KhmerDate(new Date()).toLunar();
});

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

/** ស្ថានភាពបង្ហាញម៉ឺនុយជ្រើសរើសពណ៌ (Theme picker modal state) */
const showThemePicker = ref(false);

/** បញ្ជីពណ៌ (List of colors from ThemeService) */
const themeColors = ThemeService.THEME_COLORS;

/** បើកម៉ឺនុយ (Open modal) */
const openThemePicker = () => {
  showThemePicker.value = true;
};

/** ជ្រើសរើសពណ៌ថ្មី (Select new color) */
const selectTheme = (color: string) => {
  ThemeService.setTheme(color);
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
        <!-- ក្រុមការកំណត់ប្រតិទិន (Calendar Setting Group) -->
        <SettingsGroup title="Calendar Setting">
          <div @click="openThemePicker" class="clickable-setting">
            <SettingItem :icon="renderIcon(moonOutline)" label="ផ្លាស់ប្តូរស្បែក" />
          </div>
          <SettingItem :icon="renderIcon(calendarOutline)" label="ថ្ងៃផ្តើមនៃសប្តាហ៍" />
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

    <!-- ម៉ឺនុយជ្រើសរើសស្បែកពណ៌ (Theme Picker Bottom Sheet) using UI framework -->
    <BizColorPickerSheet 
      v-model="showThemePicker"
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
  border-bottom-right-radius: 48px;
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

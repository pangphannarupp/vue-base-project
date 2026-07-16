<script setup lang="ts">
import { ref } from 'vue';
import { BizBottomSheet } from '@phanna/ui-framework';
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
import MoreHeader from '../components/MoreHeader.vue';
import SettingsGroup from '../components/SettingsGroup.vue';
import SettingItem from '../components/SettingItem.vue';
import { ThemeService } from '../services/ThemeService';

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
    <!-- ផ្នែកក្បាលនៃការកំណត់ (Settings header component) -->
    <MoreHeader 
      title="Smart Calendar" 
      subtitle="ឆ្នាំរោង ឆស័ក ព.ស. ២៥៦០" 
    />

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

    <!-- ម៉ឺនុយជ្រើសរើសស្បែកពណ៌ (Theme Picker Bottom Sheet) using UI framework -->
    <BizBottomSheet v-model="showThemePicker">
      <template #header>
        <div class="sheet-header">
          <h3>ជ្រើសរើសពណ៌ស្បែក</h3>
        </div>
      </template>
      <div class="color-grid">
        <button 
          v-for="color in themeColors" 
          :key="color"
          class="color-swatch"
          :style="{ backgroundColor: color }"
          @click="selectTheme(color)"
        ></button>
      </div>
    </BizBottomSheet>
  </div>
</template>

<style scoped>
.more-view {
  background-color: #ffffff;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.settings-content {
  padding: 24px;
}

.clickable-setting {
  cursor: pointer;
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 24px 24px 0 24px;
}

.sheet-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 40px);
  justify-content: center;
  gap: 16px;
  padding: 0 24px 40px 24px;
}

.color-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.color-swatch:hover {
  transform: scale(1.1);
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>

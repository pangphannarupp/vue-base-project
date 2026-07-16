<script setup lang="ts">
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

const renderIcon = (iconStr: string) => {
  if (iconStr.startsWith('data:image/svg+xml;utf8,')) {
    return iconStr.replace('data:image/svg+xml;utf8,', '');
  }
  return iconStr;
};
</script>

<template>
  <div class="more-view">
    <MoreHeader 
      title="Smart Calendar" 
      subtitle="ឆ្នាំរោង ឆស័ក ព.ស. ២៥៦០" 
    />

    <div class="settings-content">
      <SettingsGroup title="Calendar Setting">
        <SettingItem :icon="renderIcon(moonOutline)" label="ផ្លាស់ប្តូរស្បែក" />
        <SettingItem :icon="renderIcon(calendarOutline)" label="ថ្ងៃផ្តើមនៃសប្តាហ៍" />
        <SettingItem :icon="renderIcon(alarmOutline)" label="កំណត់ការជូនដំណឹង" />
        <SettingItem :icon="renderIcon(globeOutline)" label="ប្ដូរភាសា" />
      </SettingsGroup>

      <SettingsGroup title="Data & Tool">
        <SettingItem :icon="renderIcon(timeOutline)" label="គណនារយៈពេល" />
        <SettingItem :icon="renderIcon(cloudOutline)" label="បម្រុងទុក / ស្ដារ" />
      </SettingsGroup>

      <SettingsGroup title="Support Us">
        <SettingItem :icon="renderIcon(thumbsUpOutline)" label="Facebook" />
        <SettingItem :icon="renderIcon(chatboxEllipsesOutline)" label="មតិ និងការវាយតម្លៃ" />
        <SettingItem :icon="renderIcon(shareSocialOutline)" label="ចែករំលែក" />
      </SettingsGroup>

      <SettingsGroup title="អំពីកម្មវិធី">
        <SettingItem :icon="renderIcon(informationCircleOutline)" label="អំពីកម្មវិធី" />
        <SettingItem :icon="renderIcon(starOutline)" label="មុខងារថ្មី" />
      </SettingsGroup>
    </div>
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
</style>

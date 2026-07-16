<script setup lang="ts">
import { computed } from 'vue';
import type { IKhmerDate } from '@phanna/ui-framework/dist/KhmerDate';

/**
 * លក្ខណៈដែលត្រូវបញ្ជូនមកកាន់សមាសភាគ (Props for the component)
 */
const props = defineProps<{
  /** កាលបរិច្ឆេទសកល (Gregorian Date object) */
  date: Date;
  /** ព័ត៌មានកាលបរិច្ឆេទខ្មែរ (Khmer Lunar Date Info) */
  khmerDateInfo: IKhmerDate;
}>();

const WEEKDAYS = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
const MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

/** បំប្លែងលេខអារ៉ាប់ទៅជាលេខខ្មែរ (Convert Arabic numbers to Khmer digits) */
const toKhmerNumber = (num: number) => num.toString().split('').map(d => KHMER_DIGITS[parseInt(d)]).join('');

const weekday = computed(() => WEEKDAYS[props.date.getDay()]);
const gregorianDay = computed(() => toKhmerNumber(props.date.getDate()));
const gregorianMonth = computed(() => MONTHS[props.date.getMonth()]);
const gregorianYear = computed(() => toKhmerNumber(props.date.getFullYear()));
</script>

<template>
  <!-- កាតបង្ហាញកាលបរិច្ឆេទខ្មែរ (Khmer date card container) -->
  <div class="card khmer-date-card">
    <!-- បង្ហាញកាលបរិច្ឆេទចន្ទគតិ (Display Lunar date) -->
    <p>ថ្ងៃ{{ weekday }} {{ khmerDateInfo.lunarDay }} ខែ{{ khmerDateInfo.lunarMonth }} ឆ្នាំ{{ khmerDateInfo.zodiacYear }} {{ khmerDateInfo.stem }} ព.ស. {{ khmerDateInfo.lunarYear }}</p>
    <!-- បង្ហាញកាលបរិច្ឆេទសកល (Display Gregorian date) -->
    <p>ត្រូវនឹង ថ្ងៃទី{{ gregorianDay }} ខែ{{ gregorianMonth }} ឆ្នាំ{{ gregorianYear }}</p>
    <!-- ប៊ូតុងចម្លង (Copy button/text) -->
    <p class="moon-phase">ចម្លង</p>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
}

.khmer-date-card {
  color: #555;
  line-height: 1.6;
}

.moon-phase {
  color: var(--primary-theme-color);
  font-weight: bold;
  margin-top: 16px;
}
</style>

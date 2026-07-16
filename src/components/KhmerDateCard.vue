<script setup lang="ts">
import { computed } from 'vue';
import type { IKhmerDate } from '@phanna/ui-framework/dist/KhmerDate';

const props = defineProps<{
  date: Date;
  khmerDateInfo: IKhmerDate;
}>();

const WEEKDAYS = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
const MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

const toKhmerNumber = (num: number) => num.toString().split('').map(d => KHMER_DIGITS[parseInt(d)]).join('');

const weekday = computed(() => WEEKDAYS[props.date.getDay()]);
const gregorianDay = computed(() => toKhmerNumber(props.date.getDate()));
const gregorianMonth = computed(() => MONTHS[props.date.getMonth()]);
const gregorianYear = computed(() => toKhmerNumber(props.date.getFullYear()));
</script>

<template>
  <div class="card khmer-date-card">
    <p>ថ្ងៃ{{ weekday }} {{ khmerDateInfo.lunarDay }} ខែ{{ khmerDateInfo.lunarMonth }} ឆ្នាំ{{ khmerDateInfo.zodiacYear }} {{ khmerDateInfo.stem }} ព.ស. {{ khmerDateInfo.lunarYear }}</p>
    <p>ត្រូវនឹង ថ្ងៃទី{{ gregorianDay }} ខែ{{ gregorianMonth }} ឆ្នាំ{{ gregorianYear }}</p>
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
  color: #e53935;
  font-weight: bold;
  margin-top: 16px;
}
</style>

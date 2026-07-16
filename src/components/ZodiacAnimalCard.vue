<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  zodiacYear: string;
}>();

const ZODIAC_ICONS: Record<string, string> = {
  'ជូត': '🐀', 'ឆ្លូវ': '🐂', 'ខាល': '🐅', 'ថោះ': '🐇', 'រោង': '🐉', 'ម្សាញ់': '🐍',
  'មមី': '🐎', 'មមែ': '🐐', 'វក': '🐒', 'រកា': '🐓', 'ច': '🐕', 'កុរ': '🐖'
};

const icon = computed(() => ZODIAC_ICONS[props.zodiacYear] || '');
</script>

<template>
  <div class="card animals-card">
    <div class="animal">
      <span class="icon">{{ icon }}</span>
      <span class="label">{{ zodiacYear }}</span>
    </div>
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

.animals-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.animal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  font-size: 2.5rem;
  color: #e53935;
}

.label {
  color: #e53935;
  margin-top: 8px;
}
</style>

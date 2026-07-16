<script setup lang="ts">
import { computed } from 'vue';

/**
 * លក្ខណៈដែលត្រូវបញ្ជូនមកកាន់សមាសភាគ (Props for the component)
 */
const props = defineProps<{
  /** ឆ្នាំសត្វ (Zodiac animal name) */
  zodiacYear: string;
  /** សត្វតំណាងទី២ (Secondary zodiac animal, optional) */
  zodiacSecondary?: string;
}>();

/** វចនានុក្រមរូបតំណាងសត្វ (Dictionary for zodiac animal icons) */
const ZODIAC_ICONS: Record<string, string> = {
  'ជូត': '🐀', 'ឆ្លូវ': '🐂', 'ខាល': '🐅', 'ថោះ': '🐇', 'រោង': '🐉', 'ម្សាញ់': '🐍',
  'មមី': '🐎', 'មមែ': '🐐', 'វក': '🐒', 'រកា': '🐓', 'ច': '🐕', 'កុរ': '🐖'
};

/** គណនារូបតំណាងសត្វដោយផ្អែកលើឈ្មោះឆ្នាំ (Compute animal icon based on year name) */
const iconPrimary = computed(() => ZODIAC_ICONS[props.zodiacYear] || '');
const iconSecondary = computed(() => props.zodiacSecondary ? ZODIAC_ICONS[props.zodiacSecondary] : '');
</script>

<template>
  <!-- កាតបង្ហាញសត្វតំណាងឆ្នាំ (Zodiac animal card container) -->
  <div class="card animals-card">
    <div class="animal">
      <span class="icon">{{ iconPrimary }}</span>
      <span class="label">{{ zodiacYear }}</span>
    </div>
    
    <div v-if="zodiacSecondary" class="separator">x</div>
    
    <div v-if="zodiacSecondary" class="animal">
      <span class="icon">{{ iconSecondary }}</span>
      <span class="label">{{ zodiacSecondary }}</span>
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
  color: var(--primary-theme-color);
}

.label {
  color: var(--primary-theme-color);
  margin-top: 8px;
  font-size: 0.9rem;
}

.separator {
  color: var(--primary-theme-color);
  font-size: 1.2rem;
  font-weight: bold;
}
</style>

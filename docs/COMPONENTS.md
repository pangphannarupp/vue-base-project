# UI Components Reference / ឯកសារយោងសមាសភាគ UI

If you are new to Vue, a **Component** is simply a reusable piece of the screen (like a custom Lego block). Instead of writing the same HTML 100 times, we write a Component once and use it everywhere.  
ប្រសិនបើអ្នកថ្មីចំពោះ Vue នោះ **Component (សមាសភាគ)** គ្រាន់តែជាផ្នែកនៃអេក្រង់ដែលអាចប្រើប្រាស់ឡើងវិញបាន (ដូចជាដុំ Lego ផ្ទាល់ខ្លួន)។ ជំនួសឲ្យការសរសេរ HTML ដដែលៗ ១០០ ដង យើងសរសេរសមាសភាគតែម្តង ហើយប្រើវាគ្រប់ទីកន្លែង។

### The Restaurant Analogy (Props & Emits) / ការប្រៀបធៀបទៅនឹងភោជនីយដ្ឋាន
Think of a Component like a Waiter in a restaurant:  
ចូរស្រមៃថាសមាសភាគប្រៀបដូចជាអ្នករត់តុនៅក្នុងភោជនីយដ្ឋាន៖
- **Props**: This is the order you give to the waiter. Information flows *DOWN* into the component. (នេះជាការកម្ម៉ង់ដែលអ្នកប្រាប់ទៅអ្នករត់តុ។ ទិន្នន័យហូរចូល *ចុះក្រោម* ទៅក្នុងសមាសភាគ។)
- **Emits**: This is the waiter shouting back to the kitchen that the food is ready. Information flows *UP* out of the component. (នេះជាពេលអ្នករត់តុស្រែកប្រាប់ទៅផ្ទះបាយថាម្ហូបរួចរាល់ហើយ។ ទិន្នន័យហូរចេញ *ឡើងលើ* ពីសមាសភាគ។)

---

## 1. `BizKhmerCalendar` (ប្រតិទិនខ្មែរ)
This is our biggest and most complex component. It handles drawing the grid of 30 days and mixing Gregorian numbers with Khmer text.  
នេះគឺជាសមាសភាគធំបំផុត និងស្មុគស្មាញបំផុតរបស់យើង។ វាគ្រប់គ្រងការគូរក្រឡា ៣០ ថ្ងៃ និងលាយបញ្ចូលគ្នារវាងលេខសកល និងអក្សរខ្មែរ។

**Props (What you tell it):**
- `initialDate` (Date): Tells the calendar which month to show first. (ប្រាប់ប្រតិទិនឲ្យដឹងថាត្រូវបង្ហាញខែណាមុនគេ។)

**Emits (What it tells you):**
- `@date-selected`: It shouts, *"Hey, the user clicked on a day! Here is the Date object!"* (វាស្រែកប្រាប់ថា៖ *"នែ! អ្នកប្រើប្រាស់បានចុចលើថ្ងៃមួយហើយ! នេះជាកាលបរិច្ឆេទនោះ!"*)
- `@month-changed`: It shouts, *"Hey, the user swiped to the next month!"* (វាស្រែកប្រាប់ថា៖ *"នែ! អ្នកប្រើប្រាស់បានអូសទៅខែបន្ទាប់ហើយ!"*)

**Usage Example / របៀបប្រើប្រាស់:**
```vue
<template>
  <BizKhmerCalendar
    :initialDate="currentDate"
    @date-selected="handleDateClick"
    @month-changed="loadHolidaysForMonth"
  />
</template>

<script setup>
import { ref } from 'vue';
import { BizKhmerCalendar } from '@phanna/ui-framework';

const currentDate = ref(new Date());

function handleDateClick(date) {
  // This function runs because of the emit! (អនុគមន៍នេះដំណើរការដោយសារតែ emit!)
  console.log("User clicked on:", date); 
}
</script>
```

---

## 2. `BizBottomSheet` (ផ្ទាំងលោតពីខាងក្រោម)
A modern, mobile-friendly panel that smoothly slides up from the bottom of the phone screen. We use this to show details without changing the page.  
ជាផ្ទាំងបែបទំនើប ដែលរុញឡើងពីផ្នែកខាងក្រោមនៃអេក្រង់ទូរស័ព្ទយ៉ាងរលូន។ យើងប្រើវាដើម្បីបង្ហាញព័ត៌មានលម្អិត ដោយមិនចាំបាច់ប្តូរទំព័រ។

**Props:**
- `modelValue` (boolean): `true` means slide UP. `false` means slide DOWN. (`true` មានន័យថារុញឡើង។ `false` មានន័យថារុញចុះ។)
- `title` (string): The text at the top of the sheet. (អត្ថបទនៅផ្នែកខាងលើនៃផ្ទាំង។)

**Usage Example / របៀបប្រើប្រាស់:**
```vue
<template>
  <!-- Clicking this changes the ref to TRUE / ការចុចប៊ូតុងនេះ ប្តូរ ref ទៅជា TRUE -->
  <button @click="showSheet = true">Open Details</button>

  <!-- The sheet sees TRUE and slides up / ផ្ទាំងឃើញ TRUE វានឹងរុញឡើងលើ -->
  <BizBottomSheet v-model="showSheet" title="Holiday Information">
    <p>This is a national holiday in Cambodia.</p>
  </BizBottomSheet>
</template>

<script setup>
import { ref } from 'vue';
import { BizBottomSheet } from '@phanna/ui-framework';

// The sheet is hidden by default / ផ្ទាំងត្រូវបានលាក់ជាលំនាំដើម
const showSheet = ref(false); 
</script>
```

# UI Components Reference / ឯកសារយោងសមាសភាគ UI

The Khmer Smart Calendar relies heavily on the custom `@phanna/ui-framework`. This document outlines the core components used across the application to maintain a consistent, premium design.  
ប្រតិទិនឆ្លាតវៃខ្មែរពឹងផ្អែកយ៉ាងខ្លាំងលើ `@phanna/ui-framework`។ ឯកសារនេះបង្ហាញពីសមាសភាគសំខាន់ៗដែលត្រូវបានប្រើប្រាស់នៅទូទាំងកម្មវិធី ដើម្បីរក្សារចនាបទឲ្យមានភាពស្រស់ស្អាត និងស៊ីសង្វាក់គ្នា។

## 1. `BizKhmerCalendar` (ប្រតិទិនខ្មែរ)
The flagship component that renders a fully functional monthly grid, integrating standard Gregorian dates with Khmer lunar calculations.  
ជាសមាសភាគដ៏សំខាន់បំផុតដែលបង្ហាញក្រឡាប្រតិទិនប្រចាំខែយ៉ាងពេញលេញ ដោយរួមបញ្ចូលកាលបរិច្ឆេទសកលស្តង់ដារ ជាមួយនឹងការគណនាចន្ទគតិខ្មែរ។

**Props (ទិន្នន័យបញ្ជូនចូល):**
- `initialDate` (Date): The month and year the calendar should display initially. (ខែ និងឆ្នាំដែលប្រតិទិនគួរតែបង្ហាញជាលើកដំបូង។)

**Emits (ព្រឹត្តិការណ៍បញ្ជូនចេញ):**
- `@date-selected`: Fired when a user taps a specific day. Returns the date object. (បញ្ជូនចេញនៅពេលអ្នកប្រើប្រាស់ចុចលើថ្ងៃជាក់លាក់ណាមួយ។)
- `@month-changed`: Fired when swiping to previous/next months. (បញ្ជូនចេញនៅពេលអូសទៅខែមុន ឬខែបន្ទាប់។)

**Usage Example (ឧទាហរណ៍នៃការប្រើប្រាស់):**
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
  console.log("User clicked on:", date);
}
</script>
```

---

## 2. `BizBottomSheet` (ផ្ទាំងលោតពីខាងក្រោម)
A modern, mobile-friendly modal that smoothly slides up from the bottom of the screen. We use this to display specific holiday details or lunar date information when a day is clicked on the calendar.  
ជាផ្ទាំង (Modal) បែបទំនើប ដែលរុញឡើងពីផ្នែកខាងក្រោមនៃអេក្រង់យ៉ាងរលូន។ យើងប្រើវាដើម្បីបង្ហាញព័ត៌មានលម្អិតអំពីថ្ងៃឈប់សម្រាក ឬថ្ងៃចន្ទគតិ នៅពេលថ្ងៃណាមួយនៅលើប្រតិទិនត្រូវបានចុច។

**Props:**
- `modelValue` (boolean): Controls whether the sheet is visible or hidden. (គ្រប់គ្រងការបង្ហាញ ឬលាក់ផ្ទាំងនេះ។)
- `title` (string): The header text of the sheet. (អត្ថបទចំណងជើងនៃផ្ទាំង។)

**Usage Example (ឧទាហរណ៍នៃការប្រើប្រាស់):**
```vue
<template>
  <button @click="showSheet = true">Open Details</button>

  <BizBottomSheet v-model="showSheet" title="Holiday Information">
    <p>This is a national holiday in Cambodia.</p>
  </BizBottomSheet>
</template>

<script setup>
import { ref } from 'vue';
import { BizBottomSheet } from '@phanna/ui-framework';

const showSheet = ref(false);
</script>
```

---

## 3. `BizDynamicIsland` (ផ្ទាំងអណ្តែតថាមវន្ត)
A highly responsive popup notification system that appears elegantly at the top of the screen to confirm user actions (e.g., "Theme applied successfully").  
ប្រព័ន្ធផ្តល់ដំណឹង (Popup) ដែលមានភាពរហ័សរហួន ដែលបង្ហាញយ៉ាងស្រស់ស្អាតនៅផ្នែកខាងលើនៃអេក្រង់ ដើម្បីបញ្ជាក់ពីសកម្មភាពរបស់អ្នកប្រើប្រាស់ (ឧ. "បានអនុវត្តពណ៌ស្បែកដោយជោគជ័យ")។

---

## 4. `BizSegment` (ប៊ូតុងបែងចែក)
Used in the Settings view to allow users to toggle between two options (e.g., setting the First Day of the Week to Sunday vs. Monday).  
ត្រូវបានប្រើប្រាស់នៅក្នុងទំព័រការកំណត់ (Settings) ដើម្បីអនុញ្ញាតឲ្យអ្នកប្រើប្រាស់ផ្លាស់ប្តូរជម្រើស (ឧ. ការកំណត់ថ្ងៃដំបូងនៃសប្តាហ៍ជាថ្ងៃអាទិត្យ ឬថ្ងៃច័ន្ទ)។

# Khmer Lunar & Zodiac Logic / តក្កវិជ្ជាចន្ទគតិ និងឆ្នាំសត្វខ្មែរ

This document explains the business logic behind the core features of the Khmer Smart Calendar: converting dates and calculating zodiac animals.  
ឯកសារនេះពន្យល់ពីតក្កវិជ្ជាអាជីវកម្មដែលនៅពីក្រោយលក្ខណៈពិសេសចម្បងនៃប្រតិទិនឆ្លាតវៃខ្មែរ៖ ការបម្លែងកាលបរិច្ឆេទ និងការគណនាឆ្នាំសត្វ។

## 1. Khmer Lunar Date Conversion / ការបម្លែងកាលបរិច្ឆេទចន្ទគតិខ្មែរ
The traditional Khmer calendar is a lunisolar system. Unlike the standard Gregorian calendar, months are determined by the phases of the moon.  
ប្រតិទិនខ្មែរប្រពៃណី គឺជាប្រព័ន្ធចន្ទគតិ-សុរិយគតិ (Lunisolar)។ ខុសពីប្រតិទិនសកលស្តង់ដារ ខែត្រូវបានកំណត់ដោយដំណើររបស់ព្រះច័ន្ទ។

Our application dynamically calculates:  
កម្មវិធីរបស់យើងគណនាដោយស្វ័យប្រវត្តិនូវ៖
- **Lunar Day (ថ្ងៃចន្ទគតិ)**: From 1st to 15th Waxing (កើត) or Waning (រោច). (ពី ១ ដល់ ១៥ កើត ឬរោច)
- **Lunar Month (ខែចន្ទគតិ)**: From មិគសិរ (Mikhasê) to កត្តិក (Kâtdĕk), including Leap Months (Adhikamas) in certain years. (ពីខែមិគសិរ ដល់ កត្តិក រួមទាំងខែត្រួត (អធិកមាស) ក្នុងឆ្នាំខ្លះ)

*(Note: The actual mathematical conversion logic is safely encapsulated within the external `@phanna/ui-framework` library, ensuring consistent formatting across all views).*  
*(ចំណាំ៖ តក្កវិជ្ជាគណិតវិទ្យាជាក់ស្តែងសម្រាប់ការបម្លែងត្រូវបានរក្សាទុកយ៉ាងមានសុវត្ថិភាពនៅក្នុងបណ្ណាល័យ (Library) `@phanna/ui-framework` ខាងក្រៅ ដើម្បីធានាបាននូវទម្រង់ដូចគ្នាទាំងស្រុង)*។

**Usage Example (ឧទាហរណ៍នៃការប្រើប្រាស់):**
```typescript
import { KhmerDate } from '@phanna/ui-framework/dist/KhmerDate';

const today = new Date();
const lunarInfo = new KhmerDate(today).toLunar();

console.log(lunarInfo.day);        // e.g., "១៥ កើត" (15th Waxing)
console.log(lunarInfo.month);      // e.g., "ពិសាខ" (Pisak)
console.log(lunarInfo.zodiacYear); // e.g., "រោង" (Dragon)
console.log(lunarInfo.stem);       // e.g., "ឆស័ក" (Chhasak)
```

## 2. Zodiac Animals (ឆ្នាំសត្វទាំង ១២)
Cambodian culture utilizes a 12-animal zodiac cycle, tied to the Lunar New Year (Choul Chnam Thmey) which typically falls in mid-April.  
វប្បធម៌ខ្មែរប្រើប្រាស់វដ្តឆ្នាំសត្វទាំង ១២ ដែលផ្សារភ្ជាប់ទៅនឹងបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ ដែលជាទូទៅតែងតែចូលមកដល់នៅពាក់កណ្តាលខែមេសា។

Our system dynamically handles the boundary logic for the New Year:  
ប្រព័ន្ធរបស់យើងគ្រប់គ្រងតក្កវិជ្ជាព្រំដែន សម្រាប់ថ្ងៃចូលឆ្នាំថ្មីដោយស្វ័យប្រវត្តិ៖
- **Pre-April Dates**: Dates before the Lunar New Year still inherit the Zodiac animal from the previous Gregorian year. (កាលបរិច្ឆេទមុនខែមេសា គឺនៅតែបន្តប្រើប្រាស់ឆ្នាំសត្វពីឆ្នាំសកលមុន)
- **Dual Zodiac View**: When viewing the entire calendar year at a glance, the app intelligently calculates and displays the exact shift in Zodiac animal. (នៅពេលមើលប្រតិទិនពេញមួយឆ្នាំ កម្មវិធីនេះធ្វើការគណនាយ៉ាងឆ្លាតវៃ និងបង្ហាញពីការផ្លាស់ប្តូរឆ្នាំសត្វយ៉ាងច្បាស់លាស់)

## 3. Stems (ស័ក)
The calendar also computes the 10-year cycle of "Stems" (e.g., ឯកស័ក, ទោស័ក, ត្រីស័ក).  
ប្រតិទិននេះក៏ធ្វើការគណនាវដ្ត ១០ ឆ្នាំនៃ "ស័ក" ផងដែរ (ឧ. ឯកស័ក, ទោស័ក, ត្រីស័ក)។

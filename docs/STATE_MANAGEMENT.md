# State Management & Theming / ការគ្រប់គ្រងទិន្នន័យ និងពណ៌ស្បែក

This document explains how the Khmer Smart Calendar shares reactive data between views and elegantly manages its 54-color dynamic theme system.  
ឯកសារនេះពន្យល់ពីរបៀបដែលប្រតិទិនឆ្លាតវៃខ្មែរចែករំលែកទិន្នន័យរវាងទំព័រផ្សេងៗ និងគ្រប់គ្រងប្រព័ន្ធពណ៌ស្បែក ៥៤ ពណ៌របស់វា។

## 1. Lightweight State Management / ការគ្រប់គ្រងទិន្នន័យបែបស្រាល
Instead of using heavy state management libraries like Vuex or Pinia, we utilize Vue 3's native Reactivity API (`ref`, `computed`, `watch`) exported from standalone TypeScript files (Services).  
ជំនួសឲ្យការប្រើប្រាស់បណ្ណាល័យគ្រប់គ្រងទិន្នន័យធំៗដូចជា Vuex ឬ Pinia យើងប្រើប្រាស់ Reactivity API ដើមរបស់ Vue 3 (`ref`, `computed`, `watch`) ដែលបាននាំចេញ (Export) ពីឯកសារ TypeScript តែមួយឯកឯង (Services)។

**Example (`SettingsService.ts`):**
```typescript
import { ref } from 'vue'

// This ref is global because it is declared outside of a component
// នេះជា ref សកល ព្រោះវាត្រូវបានប្រកាសនៅខាងក្រៅសមាសភាគ
const firstDayOfWeek = ref(0);

export function useSettings() {
  return { firstDayOfWeek }
}
```
Whenever any view imports `useSettings()` and updates `firstDayOfWeek`, **all other views instantly react and re-render**.  
រាល់ពេលដែលទំព័រណាមួយនាំចូល `useSettings()` ហើយផ្លាស់ប្តូរតម្លៃ `firstDayOfWeek` **ទំព័រផ្សេងៗទៀតទាំងអស់នឹងធ្វើបច្ចុប្បន្នភាពភ្លាមៗដោយស្វ័យប្រវត្តិ**។

## 2. Dynamic Theme System (`ThemeService.ts`) / ប្រព័ន្ធពណ៌ស្បែកថាមវន្ត
The application allows the user to choose from 54 curated colors. But how does changing a single Javascript variable instantly update the entire UI framework?  
កម្មវិធីនេះអនុញ្ញាតឲ្យអ្នកប្រើប្រាស់ជ្រើសរើសពណ៌ចំនួន ៥៤។ ប៉ុន្តែតើការផ្លាស់ប្តូរអថេរ Javascript តែមួយ អាចធ្វើបច្ចុប្បន្នភាព UI ទាំងមូលភ្លាមៗបានដោយរបៀបណា?

**The Magic of CSS Custom Variables (អាថ៌កំបាំងនៃអថេរ CSS):**
1. When a user selects a color in the `MoreView.vue` settings, the `ThemeService` receives the Hex color code (e.g., `#FF5733`). (នៅពេលអ្នកប្រើប្រាស់ជ្រើសរើសពណ៌នៅក្នុង `MoreView.vue` នោះ `ThemeService` ទទួលបានកូដពណ៌ (ឧ. `#FF5733`))
2. The service mathematically generates lighter and darker shades of that color. (សេវាកម្មនេះគណនាដោយស្វ័យប្រវត្តិដើម្បីបង្កើតស្រមោលពណ៌ស្រាលជាង និងចាស់ជាង)
3. It directly injects these colors into the standard browser `document.documentElement` (`:root` selector) as CSS variables. (វាបញ្ចូលពណ៌ទាំងនេះដោយផ្ទាល់ទៅក្នុង `document.documentElement` (`:root`) ជាអថេរ CSS)

```javascript
document.documentElement.style.setProperty('--ion-color-primary', '#FF5733');
```

Because every component in the `@phanna/ui-framework` is designed to inherit `--ion-color-primary`, the entire interface changes color without a single page reload!  
ដោយសាររាល់សមាសភាគនៅក្នុង `@phanna/ui-framework` ត្រូវបានរចនាឡើងដើម្បីទទួលយក `--ion-color-primary` នោះចំណុចប្រទាក់ទាំងមូលនឹងផ្លាស់ប្តូរពណ៌ ដោយមិនចាំបាច់ផ្ទុកទំព័រឡើងវិញនោះទេ!

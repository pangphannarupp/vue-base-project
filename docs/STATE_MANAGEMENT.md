# State Management & Theming / ការគ្រប់គ្រងទិន្នន័យ និងពណ៌ស្បែក

If you have two completely different screens (like the Home screen and the Settings screen) and you want them to share the exact same data, how do you do it?  
ប្រសិនបើអ្នកមានអេក្រង់ពីរផ្សេងគ្នា (ឧទាហរណ៍ អេក្រង់ដើម និងអេក្រង់ការកំណត់) ហើយអ្នកចង់ឲ្យពួកវាប្រើប្រាស់ទិន្នន័យដូចគ្នាបេះបិទ តើអ្នកត្រូវធ្វើដូចម្តេច?

In many Vue projects, developers use a massive library called **Pinia** or **Vuex**. In this project, we keep it simple. We just use Vue 3's built-in `ref`.  
នៅក្នុងគម្រោង Vue ជាច្រើន អ្នកអភិវឌ្ឍន៍ប្រើប្រាស់បណ្ណាល័យធំៗដូចជា **Pinia** ឬ **Vuex**។ នៅក្នុងគម្រោងនេះ យើងធ្វើឲ្យវាសាមញ្ញ ដោយគ្រាន់តែប្រើមុខងារ `ref` របស់ Vue 3។

## 1. Lightweight State Management / ការគ្រប់គ្រងទិន្នន័យបែបស្រាល

### The Shared Whiteboard Analogy (ការប្រៀបធៀបទៅនឹងក្ដារខៀនរួម)
Imagine `SettingsService.ts` is a whiteboard in the center of the office.  
ចូរស្រមៃថា `SettingsService.ts` គឺជាក្ដារខៀនមួយនៅចំកណ្តាលការិយាល័យ។
- The variable `firstDayOfWeek = ref(0)` is written on that whiteboard. (អថេរ `firstDayOfWeek` ត្រូវបានសរសេរនៅលើក្ដារខៀននោះ)
- Because it is written *outside* of any specific component, ANY component can look at the whiteboard and read the value. (ដោយសារវាត្រូវបានសរសេរ *នៅខាងក្រៅ* សមាសភាគណាមួយ សមាសភាគទាំងអស់អាចសម្លឹងមើលក្ដារខៀន និងអានតម្លៃនោះបាន)
- If `MoreView.vue` erases the whiteboard and changes the value to `1`, `MonthView.vue` instantly sees the change and re-draws the calendar! (ប្រសិនបើទំព័រការកំណត់លុបក្ដារខៀន ហើយប្តូរតម្លៃទៅជា `1` នោះទំព័រប្រតិទិននឹងឃើញការផ្លាស់ប្តូរភ្លាមៗ ហើយគូរប្រតិទិនឡើងវិញ!)

**Example (`SettingsService.ts`):**
```typescript
import { ref } from 'vue'

// This ref is global because it is OUTSIDE the function
// នេះជា ref សកល ព្រោះវានៅខាងក្រៅអនុគមន៍
const firstDayOfWeek = ref(0);

export function useSettings() {
  return { firstDayOfWeek }
}
```

---

## 2. Dynamic Theme System (`ThemeService.ts`) / ប្រព័ន្ធពណ៌ស្បែកថាមវន្ត
The application allows the user to choose from 54 curated colors. But how does changing a Javascript variable instantly update every single button and text color in the app without refreshing the page?  
កម្មវិធីនេះអនុញ្ញាតឲ្យអ្នកប្រើប្រាស់ជ្រើសរើសពណ៌ចំនួន ៥៤។ ប៉ុន្តែតើការផ្លាស់ប្តូរអថេរ Javascript អាចធ្វើបច្ចុប្បន្នភាពពណ៌ប៊ូតុង និងអត្ថបទទាំងអស់ភ្លាមៗ ដោយមិនចាំបាច់ផ្ទុកទំព័រឡើងវិញដោយរបៀបណា?

### The Magic of CSS Variables / អាថ៌កំបាំងនៃអថេរ CSS
CSS allows us to create custom variables (like a bucket of paint). We declare them using `--name` in the `:root` selector, which is the very top of the HTML document.  
CSS អនុញ្ញាតឲ្យយើងបង្កើតអថេរ (ប្រៀបដូចជាធុងថ្នាំលាប)។ យើងប្រកាសវាដោយប្រើ `--ឈ្មោះ` នៅក្នុង `:root` ដែលជាចំណុចកំពូលនៃឯកសារ HTML។

1. When a user taps a blue circle in the Settings, the Javascript `ThemeService` receives the Hex color code (e.g., `#0000FF`). (នៅពេលអ្នកប្រើប្រាស់ចុចលើរង្វង់ពណ៌ខៀវ Javascript `ThemeService` ទទួលបានកូដពណ៌)
2. Javascript reaches directly into the HTML and literally replaces the paint inside the bucket: (Javascript ចូលទៅកាន់ HTML ដោយផ្ទាល់ ហើយប្តូរថ្នាំលាបក្នុងធុងតែម្តង៖)
   ```javascript
   // This forces the browser to update the CSS immediately!
   // វាបង្ខំកម្មវិធីរុករកឲ្យធ្វើបច្ចុប្បន្នភាព CSS ភ្លាមៗ!
   document.documentElement.style.setProperty('--ion-color-primary', '#0000FF');
   ```
3. Because every single component in our UI Framework is programmed to say, *"Hey, paint me whatever color is inside the `--ion-color-primary` bucket"*, the entire screen instantly turns blue! (ដោយសាររាល់សមាសភាគទាំងអស់ត្រូវបានប្រាប់ឲ្យប្រើថ្នាំលាបចេញពីធុងនោះ អេក្រង់ទាំងមូលប្រែជាពណ៌ខៀវភ្លាមៗ!)

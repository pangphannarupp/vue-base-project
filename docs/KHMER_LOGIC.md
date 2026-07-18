# Khmer Lunar & Zodiac Logic / តក្កវិជ្ជាចន្ទគតិ និងឆ្នាំសត្វខ្មែរ

If you are a developer tasked with editing the calendar logic, it is crucial that you understand how the Cambodian calendar works conceptually.  
ប្រសិនបើអ្នកជាអ្នកអភិវឌ្ឍន៍ដែលត្រូវកែប្រែប្រតិទិន វាជារឿងសំខាន់ដែលអ្នកត្រូវយល់ពីរបៀបដែលប្រតិទិនខ្មែរដំណើរការជាមុនសិន។

---

## 1. Solar vs Lunisolar / សុរិយគតិ ធៀបនឹង ចន្ទគតិ-សុរិយគតិ
The standard Gregorian calendar (January, February...) is a **Solar** calendar. It tracks the Earth going around the Sun.  
ប្រតិទិនសកលស្តង់ដារ (មករា, កុម្ភៈ...) គឺជាប្រតិទិន **សុរិយគតិ**។ វាផ្អែកលើចលនាផែនដីគោចរជុំវិញព្រះអាទិត្យ។

The traditional Khmer calendar is **Lunisolar**. This means the days and months are tracked by the phases of the moon (Lunar), but the years are kept in sync with the Sun (Solar) by occasionally adding "Leap Months" (អធិកមាស) so the calendar doesn't drift away from the seasons!  
ប្រតិទិនខ្មែរប្រពៃណី គឺជាប្រតិទិន **ចន្ទគតិ-សុរិយគតិ**។ មានន័យថា ថ្ងៃ និងខែត្រូវបានគណនាតាមដំណាក់កាលព្រះច័ន្ទ (ចន្ទគតិ) ប៉ុន្តែឆ្នាំត្រូវបានរក្សាឲ្យស្របនឹងព្រះអាទិត្យ (សុរិយគតិ) ដោយមានការបន្ថែម "ខែត្រួត" (អធិកមាស) ម្តងម្កាល ដើម្បីកុំឲ្យរដូវកាលឃ្លាតឆ្ងាយពីគ្នា!

### How we handle the math / របៀបដែលយើងដោះស្រាយការគណនា
Writing the mathematical formulas to predict moon phases and leap months is incredibly difficult. That is why **we do not write that code in this repository!**  
ការសរសេររូបមន្តគណិតវិទ្យាដើម្បីទាយពីដំណាក់កាលព្រះច័ន្ទ និងខែត្រួត គឺពិបាកខ្លាំងណាស់។ ហេតុនេះហើយទើប **យើងមិនសរសេរកូដនោះនៅក្នុងគម្រោងនេះទេ!**

We safely hide all of the complex math inside the external `@phanna/ui-framework` library. You simply give it a standard Javascript `Date` object, and it magically hands you back the translated Khmer data.  
យើងលាក់ការគណនាដ៏ស្មុគស្មាញទាំងអស់នៅក្នុងបណ្ណាល័យ `@phanna/ui-framework` ខាងក្រៅ។ អ្នកគ្រាន់តែផ្តល់អובចិច `Date` ស្តង់ដារទៅឲ្យវា ហើយវានឹងប្រគល់ទិន្នន័យខ្មែរត្រឡប់មកវិញដោយស្វ័យប្រវត្តិ។

**Usage Example / របៀបប្រើប្រាស់នៅក្នុងកូដ៖**
```typescript
import { KhmerDate } from '@phanna/ui-framework/dist/KhmerDate';

// 1. Create a standard date / បង្កើតកាលបរិច្ឆេទស្តង់ដារ
const today = new Date('2026-04-15');

// 2. Ask the library to do the hard math / ស្នើឲ្យបណ្ណាល័យធ្វើការគណនា
const lunarInfo = new KhmerDate(today).toLunar();

// 3. Use the beautifully translated data / ប្រើប្រាស់ទិន្នន័យដែលបានបម្លែងរួច
console.log(lunarInfo.day);        // "១កើត" (1st Waxing)
console.log(lunarInfo.month);      // "ពិសាខ" (Pisak)
console.log(lunarInfo.zodiacYear); // "រោង" (Dragon)
```

---

## 2. Zodiac Animals (ឆ្នាំសត្វទាំង ១២)
Cambodian culture uses a 12-animal zodiac cycle. However, the animal does not change on January 1st! The Zodiac animal changes during the **Khmer New Year (Choul Chnam Thmey)**, which falls in mid-April.  
វប្បធម៌ខ្មែរប្រើប្រាស់វដ្តឆ្នាំសត្វទាំង ១២។ ប៉ុន្តែឆ្នាំសត្វមិនផ្លាស់ប្តូរនៅថ្ងៃទី ១ មករាទេ! វាផ្លាស់ប្តូរនៅអំឡុងពេល **ចូលឆ្នាំថ្មីប្រពៃណីជាតិ** ដែលជាទូទៅនៅពាក់កណ្តាលខែមេសា។

When writing Vue components (like `ZodiacAnimalCard.vue`), you must remember this rule. The library handles the math, but your UI must expect that the month of March and the month of May in the same year will actually have *different* Zodiac animals!  
នៅពេលសរសេរសមាសភាគ Vue អ្នកត្រូវចងចាំច្បាប់នេះ។ បណ្ណាល័យជាអ្នកគណនា ប៉ុន្តែ UI របស់អ្នកត្រូវរំពឹងថា ខែមីនា និងខែឧសភា ក្នុងឆ្នាំតែមួយ នឹងមានឆ្នាំសត្វ *ខុសគ្នា*!

# Development Guide / មគ្គុទ្ទេសក៍អភិវឌ្ឍន៍

Welcome to the **Khmer Smart Calendar** development guide! If you are a new developer joining the team, don't worry—this guide is written specifically for you. We will walk you through everything step-by-step.  
សូមស្វាគមន៍មកកាន់មគ្គុទ្ទេសក៍អភិវឌ្ឍន៍ **ប្រតិទិនឆ្លាតវៃខ្មែរ**! ប្រសិនបើអ្នកជាអ្នកអភិវឌ្ឍន៍ថ្មីដែលទើបតែចូលរួមជាមួយក្រុម សូមកុំបារម្ភ—ឯកសារនេះត្រូវបានសរសេរឡើងជាពិសេសសម្រាប់អ្នក។ យើងនឹងណែនាំអ្នកមួយជំហានម្តងៗ។

---

## 1. What is this project? / តើគម្រោងនេះជាអ្វី?
This is a modern web application built with **Vue.js 3**. It is designed to run perfectly on mobile phones, tablets, and desktops. It shows a standard calendar, but seamlessly overlays the traditional **Khmer Lunar Calendar** (ថ្ងៃសីល, ឆ្នាំសត្វ, etc.) on top of it.  
នេះគឺជាកម្មវិធីវិប (Web application) ទំនើបដែលបង្កើតឡើងដោយ **Vue.js 3**។ វាត្រូវបានរចនាឡើងដើម្បីដំណើរការយ៉ាងល្អឥតខ្ចោះនៅលើទូរស័ព្ទដៃ ថេប្លេត និងកុំព្យូទ័រលើតុ។ វាបង្ហាញប្រតិទិនសកលធម្មតា ប៉ុន្តែរួមបញ្ចូលប្រតិទិន **ចន្ទគតិខ្មែរប្រពៃណី** (ថ្ងៃសីល ឆ្នាំសត្វ ល។) ពីលើវាដោយរលូន។

---

## 2. 🚀 Environment Setup / ការរៀបចំបរិស្ថាន
Before you can write code, you need to install the tools required to run the project on your computer.  
មុនពេលអ្នកអាចសរសេរកូដបាន អ្នកត្រូវដំឡើងកម្មវិធីដែលចាំបាច់ដើម្បីដំណើរការគម្រោងនេះនៅលើកុំព្យូទ័ររបស់អ្នក។

### Prerequisites (What you need to download) / តម្រូវការជាមុន
- **Node.js (v20+)**: This is the engine that runs Javascript outside the browser. Download it from [nodejs.org](https://nodejs.org/). (នេះជាម៉ាស៊ីនដែលដំណើរការ Javascript នៅខាងក្រៅកម្មវិធីរុករក។)
- **VS Code**: The best code editor for Vue. Download it from [code.visualstudio.com](https://code.visualstudio.com/). (កម្មវិធីសរសេរកូដដ៏ល្អបំផុតសម្រាប់ Vue។)
- **Vue - Official Extension**: Inside VS Code, search for "Vue - Official" (formerly Volar) in the extensions tab and install it. It provides autocomplete and error checking. (នៅក្នុង VS Code សូមដំឡើងកម្មវិធីជំនួយ "Vue - Official" ដើម្បីទទួលបានការណែនាំកូដ។)

### Installation / ការដំឡើង
Open your terminal (or Command Prompt) and type these commands:  
បើក Terminal (ឬ Command Prompt) របស់អ្នក ហើយវាយពាក្យបញ្ជាទាំងនេះ៖
```bash
# 1. Download the code to your computer (ទាញយកកូដមកកុំព្យូទ័ររបស់អ្នក)
git clone https://github.com/pangphannarupp/vue-base-project.git

# 2. Go into the project folder (ចូលទៅកាន់ថតឯកសារគម្រោង)
cd vue-base-project

# 3. Download all the required libraries (ទាញយកបណ្ណាល័យដែលចាំបាច់ទាំងអស់)
npm install
```

---

## 3. 💻 Running the App / ដំណើរការកម្មវិធី
To see the app running on your computer, type:  
ដើម្បីមើលកម្មវិធីដំណើរការនៅលើកុំព្យូទ័ររបស់អ្នក សូមវាយ៖
```bash
npm run dev
```
Open your internet browser (Chrome/Safari) and go to **`http://localhost:5173`**.  
Every time you save a file in VS Code, the browser will automatically refresh! This is called Hot Module Replacement (HMR).  
រាល់ពេលដែលអ្នករក្សាទុក (Save) ឯកសារនៅក្នុង VS Code កម្មវិធីរុករកនឹងធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ! នេះហៅថា HMR។

---

## 4. 📁 File Structure Explained / ការពន្យល់ពីរចនាសម្ព័ន្ធឯកសារ
When you open the project, you will see many folders. Here is what they do:  
នៅពេលអ្នកបើកគម្រោង អ្នកនឹងឃើញថតឯកសារជាច្រើន។ នេះជាតួនាទីរបស់វា៖

- **`src/main.ts`**: The starting point of the whole app. It boots up Vue. (ចំណុចចាប់ផ្តើមនៃកម្មវិធីទាំងមូល។ វាបើកដំណើរការ Vue។)
- **`src/App.vue`**: The main container. Every other page is loaded inside this file. (កញ្ចប់ផ្ទុកចម្បង។ រាល់ទំព័រផ្សេងទៀតត្រូវបានផ្ទុកនៅខាងក្នុងឯកសារនេះ។)
- **`src/router/index.ts`**: The "Map" of the app. It tells the app: *If the user goes to `/weather`, show the `WeatherView.vue` file.* (ផែនទីរបស់កម្មវិធី។ វាប្រាប់កម្មវិធីថា៖ ប្រសិនបើអ្នកប្រើប្រាស់ចូលទៅកាន់ `/weather` សូមបង្ហាញឯកសារ `WeatherView.vue`។)
- **`src/views/`**: These are full "Pages" (like the Home screen, Settings screen). (ទាំងនេះគឺជា "ទំព័រ" ពេញលេញ ដូចជាអេក្រង់ដើម អេក្រង់ការកំណត់។)
- **`src/components/`**: Small, reusable UI pieces (like a Button, a Card, or a Popup). Views are built by putting many Components together. (បំណែក UI តូចៗដែលអាចប្រើឡើងវិញបាន ដូចជាប៊ូតុង ឬកាត។ ទំព័រត្រូវបានបង្កើតឡើងដោយការផ្គុំសមាសភាគជាច្រើនបញ្ចូលគ្នា។)
- **`src/services/`**: Files that handle data and logic (like fetching weather data from the internet). (ឯកសារដែលគ្រប់គ្រងទិន្នន័យ និងតក្កវិជ្ជា។)

---

## 5. 🏗 Architecture for Beginners / ស្ថាបត្យកម្មសម្រាប់អ្នកចាប់ផ្តើមដំបូង

### The Composition API (`<script setup>`)
Vue 3 files are split into two parts:  
ឯកសារ Vue 3 ត្រូវបានបែងចែកជាពីរផ្នែក៖
1. `<script setup lang="ts">`: Where you write your Javascript/TypeScript logic (Variables, Functions). (កន្លែងដែលអ្នកសរសេរតក្កវិជ្ជា Javascript/TypeScript របស់អ្នក)
2. `<template>`: Where you write your HTML to show the variables to the user. (កន្លែងដែលអ្នកសរសេរ HTML ដើម្បីបង្ហាញអថេរទៅកាន់អ្នកប្រើប្រាស់។)

### Stateless vs Stateful Components / សមាសភាគមានរដ្ឋ (Stateful) និងគ្មានរដ្ឋ (Stateless)
To keep the code clean, we split components into two jobs:  
ដើម្បីរក្សាកូដឲ្យស្អាត យើងបែងចែកសមាសភាគជាពីរតួនាទី៖

1. **Stateful (Smart) Components (សមាសភាគមានរដ្ឋ)**: 
   - They fetch data from APIs and do hard math. (ពួកវាទាញយកទិន្នន័យពី APIs និងធ្វើការគណនាស្មុគស្មាញ)
   - *Example*: `EventsView.vue` asks the `HolidayService` for all holidays, and stores them in a list. (ឧទាហរណ៍៖ `EventsView.vue` ស្នើសុំថ្ងៃឈប់សម្រាកទាំងអស់ពី `HolidayService` រួចរក្សាទុកក្នុងបញ្ជីមួយ។)

2. **Stateless (Dumb) Components (សមាសភាគគ្មានរដ្ឋ)**: 
   - They just display data they are given. They don't do any thinking. (ពួកវាគ្រាន់តែបង្ហាញទិន្នន័យដែលគេផ្តល់ឲ្យប៉ុណ្ណោះ។ វាមិនធ្វើការគិតអ្វីទេ។)
   - *Example*: `EventItem.vue` receives ONE holiday from `EventsView` and simply prints the name and date on the screen. (ឧទាហរណ៍៖ `EventItem.vue` ទទួលបានថ្ងៃឈប់សម្រាកមួយពី `EventsView` ហើយគ្រាន់តែបង្ហាញឈ្មោះ និងកាលបរិច្ឆេទនៅលើអេក្រង់។)

**Why is this good?** Because if you want to use the `EventItem` design somewhere else, you can! It doesn't care where the data comes from. (ហេតុអ្វីវាល្អ? ព្រោះប្រសិនបើអ្នកចង់ប្រើការរចនា `EventItem` នៅកន្លែងផ្សេង អ្នកអាចធ្វើបាន! វាមិនខ្វល់ថាទិន្នន័យមកពីណាទេ។)

---

## 6. 📦 Building for Production / ការបង្កើតសម្រាប់ចេញផលិតផល (Production)

When your code is finished and you want to put it on the real internet:  
នៅពេលកូដរបស់អ្នករួចរាល់ ហើយអ្នកចង់ដាក់វានៅលើអ៊ីនធឺណិតពិតប្រាកដ៖
```bash
npm run build
```
This compresses all your code into a tiny, fast `dist/` folder that can be uploaded to a server!  
វាបង្រួមកូដរបស់អ្នកទាំងអស់ទៅជាថត `dist/` ដ៏តូច និងលឿន ដែលអាចបង្ហោះទៅកាន់ម៉ាស៊ីនបម្រើ (Server) បាន!

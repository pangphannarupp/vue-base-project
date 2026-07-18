# Testing Guide / មគ្គុទ្ទេសក៍សាកល្បង

Welcome to the Testing Guide! If you are new to programming, you might wonder: **"Why do we write tests?"**  
សូមស្វាគមន៍មកកាន់មគ្គុទ្ទេសក៍សាកល្បង! ប្រសិនបើអ្នកទើបតែចាប់ផ្តើមសរសេរកម្មវិធី អ្នកប្រហែលជាឆ្ងល់ថា៖ **"ហេតុអ្វីបានជាយើងសរសេរការសាកល្បង (Tests)?"**

We write tests to have a "robot" automatically check if our code works correctly every time we make a change. If you accidentally break the calendar logic while fixing a button, the robot (the test) will instantly alert you!  
យើងសរសេរការសាកល្បង ដើម្បីឲ្យមាន "មនុស្សយន្ត" ពិនិត្យដោយស្វ័យប្រវត្តិថាតើកូដរបស់យើងដំណើរការត្រឹមត្រូវឬអត់ រាល់ពេលដែលយើងធ្វើការផ្លាស់ប្តូរ។ ប្រសិនបើអ្នកចៃដន្យធ្វើឲ្យខូចតក្កវិជ្ជាប្រតិទិន ខណៈពេលកំពុងជួសជុលប៊ូតុង មនុស្សយន្ត (ការសាកល្បង) នឹងផ្តល់ដំណឹងដល់អ្នកភ្លាមៗ!

---

## 1. Unit Testing / ការសាកល្បងឯកតា (Unit Testing)
**What is it?** Unit testing is when you test ONE specific function in isolation.  
**តើវាជាអ្វី?** Unit testing គឺជាពេលដែលអ្នកសាកល្បងមុខងារ (Function) ជាក់លាក់មួយតែឯង។

For example, if we have a function `add(a, b)`, the test will ask: "If I give you 2 and 3, do you return 5?".  
We use a tool called **Vitest** to do this. It runs instantly without opening a browser.  
យើងប្រើឧបករណ៍ឈ្មោះ **Vitest** ដើម្បីធ្វើរឿងនេះ។ វាដំណើរការភ្លាមៗដោយមិនចាំបាច់បើកកម្មវិធីរុករកទេ។

**Location:** Inside the `tests/services/` folder. (ស្ថិតក្នុងថត `tests/services/`)

## 2. Component Testing / ការសាកល្បងសមាសភាគ (Component Testing)
**What is it?** This tests if a Vue Component (like a Button or a Card) displays the correct HTML and reacts when clicked.  
**តើវាជាអ្វី?** នេះគឺសាកល្បងថាតើសមាសភាគ Vue (ដូចជាប៊ូតុង ឬកាត) បង្ហាញ HTML ត្រឹមត្រូវ និងមានប្រតិកម្មនៅពេលចុចឬអត់។

We use **Vue Test Utils** to mount the component invisibly in memory and pretend to click it.  
យើងប្រើ **Vue Test Utils** ដើម្បីដំណើរការសមាសភាគដោយមើលមិនឃើញនៅក្នុងអង្គចងចាំ (Memory) និងធ្វើពុតជាចុចវា។

**Location:** Inside `tests/components/` and `tests/views/`. (ស្ថិតក្នុងថត `tests/components/` និង `tests/views/`)

**To run ALL Unit and Component Tests:**
```bash
npm run test:unit
```

---

## 3. End-to-End (E2E) Testing / ការសាកល្បងពីចុងម្ខាងទៅចុងម្ខាង (E2E)
**What is it?** E2E testing is the ultimate test. It uses a tool called **Playwright** to open a real Google Chrome browser, type on the keyboard, click buttons, and swipe pages exactly like a real human!  
**តើវាជាអ្វី?** ការសាកល្បង E2E គឺជាការសាកល្បងចុងក្រោយបំផុត។ វាប្រើឧបករណ៍ឈ្មោះ **Playwright** ដើម្បីបើកកម្មវិធីរុករក Google Chrome ពិតប្រាកដ វាយលើក្តារចុច ចុចប៊ូតុង និងអូសទំព័រ ដូចគ្នាបេះបិទទៅនឹងមនុស្សពិត!

If the E2E test passes, you know 100% that the user can use your app.  
ប្រសិនបើការសាកល្បង E2E ឆ្លងកាត់ អ្នកដឹង ១០០% ថាអ្នកប្រើប្រាស់អាចប្រើកម្មវិធីរបស់អ្នកបាន។

**To run E2E Tests:**
```bash
# (Run this ONCE to download the robot browser / ដំណើរការម្តងដើម្បីទាញយកកម្មវិធីរុករកមនុស្សយន្ត)
npx playwright install 

# (Run the tests / ដំណើរការការសាកល្បង)
npm run test:e2e
```

---

## 4. Automation Tests (CI) / ការសាកល្បងស្វ័យប្រវត្តិ (CI)
When working in a team, humans forget to run tests before uploading their code.  
នៅពេលធ្វើការជាក្រុម មនុស្សតែងតែភ្លេចដំណើរការការសាកល្បង មុនពេលបញ្ជូនកូដរបស់ពួកគេ។

To fix this, we use **GitHub Actions**. Every time you send your code to GitHub, a remote computer in the cloud automatically runs `npm run test:unit` and `npm run test:e2e` for you.  
ដើម្បីដោះស្រាយបញ្ហានេះ យើងប្រើប្រាស់ **GitHub Actions**។ រាល់ពេលដែលអ្នកបញ្ជូនកូដរបស់អ្នកទៅកាន់ GitHub កុំព្យូទ័រនៅលើក្លោដ (Cloud) នឹងដំណើរការការសាកល្បងឲ្យអ្នកដោយស្វ័យប្រវត្តិ។

- If the tests **PASS** ✅: Your code is approved and ready to merge! (កូដរបស់អ្នកត្រូវបានអនុម័ត និងត្រៀមរួចរាល់ក្នុងការបញ្ចូល!)
- If the tests **FAIL** ❌: GitHub blocks your code and tells you to fix the bug first. (GitHub នឹងទប់ស្កាត់កូដរបស់អ្នក ហើយប្រាប់ឲ្យអ្នកជួសជុលបញ្ហាជាមុនសិន។)

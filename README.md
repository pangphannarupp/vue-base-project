# Khmer Smart Calendar

A beautiful, modular, and fully featured smart calendar application tailored for the Cambodian context. Built with **Vue 3**, **Vite**, and **TypeScript**, this application seamlessly integrates the standard Gregorian calendar with the traditional Khmer lunar calendar, and offers extreme customization.

## 📚 Documentation

We have prepared comprehensive, bilingual (English & Khmer) guides with visual flowcharts to help you understand the project:

- 📖 **[Development Guide](./docs/DEVELOPMENT.md)**: Local setup, MVVM architecture, and Stateful vs Stateless component design.
- 🧪 **[Testing Guide](./docs/TESTING.md)**: How to run Unit, Component, and E2E (Playwright) tests.
- 🚀 **[Workflow & Deployment Guide](./docs/WORKFLOW.md)**: Git branching, Pull Requests, CI checks, and GitHub Pages deployment.
- 🎨 **[UI Components Reference](./docs/COMPONENTS.md)**: Details on using `BizBottomSheet`, `BizKhmerCalendar`, and others.
- 🧮 **[Khmer Lunar & Zodiac Logic](./docs/KHMER_LOGIC.md)**: How the app calculates traditional dates and zodiacs.
- 🌐 **[State Management & Theming](./docs/STATE_MANAGEMENT.md)**: Deep dive into the 54-color dynamic CSS variables system.
- 🤝 **[Contributing Guidelines](./CONTRIBUTING.md)**: Rules for reporting bugs and submitting Pull Requests.

## ✨ Features

- **Dynamic 54-Color Theme System**: A fully integrated `ThemeService` that allows users to instantly switch between 54 vibrant, carefully curated theme colors. Colors are globally reactive and elegantly applied to buttons, calendar highlights, and typography.
- **Khmer Date Conversion**: Dynamically convert standard dates into full Khmer lunar dates, including lunar day, month, zodiac year (e.g., រោង - Dragon), and stem (e.g., ឆស័ក).
- **Public Holidays**: Includes a built-in `HolidayService` that dynamically fetches and displays Cambodian national and international public holidays in real-time as you swipe between calendar months.
- **Live Weather Integration**: Uses a free Open-Meteo API to dynamically fetch and display real-time weather conditions directly inside the application.
- **Zodiac Animal Integration**: Automatically computes and beautifully renders the correct zodiac animal icon for any given year, including dual-zodiac combinations.
- **Start-of-Week Customization**: Personalize your calendar grid by dynamically shifting the first day of the week (Sunday vs. Monday), leveraging the global `SettingsService`.
- **Modern UI Framework**: Built completely on top of the custom `@phanna/ui-framework`, utilizing advanced components like `BizKhmerCalendar`, `BizBottomSheet`, `BizNoResult`, `BizSegment`, and highly responsive `BizDynamicIsland` popups for a premium native app feel.
- **Fully Localized**: Beautifully typeset with the native **Battambang** font across the entire interface. The codebase itself is also thoroughly documented with both English JSDoc and Khmer language comments for all properties, classes, and Vue functions!

## 🛠 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Routing**: Vue Router
- **UI Library**: `@phanna/ui-framework`
- **Icons**: [Ionicons](https://ionic.io/ionicons)

## 📁 Project Structure

```
src/
├── components/       # Reusable, stateless UI components (e.g., EventItem.vue, BizNoResult fallbacks)
├── services/         # Business logic and data providers (HolidayService, ThemeService, WeatherService)
├── views/            # Main application pages
│   ├── DayView.vue       # Daily breakdown with lunar details and zodiac
│   ├── EventsView.vue    # Grouped holiday and event list
│   ├── MonthView.vue     # Full calendar grid view featuring BizBottomSheet & swipe-to-fetch holidays
│   ├── MoreView.vue      # Settings panel for the 30-color dynamic theme engine
│   ├── NewTaskView.vue   # Form to create new tasks/events
│   └── WeatherView.vue   # Live location-based weather overview
├── router/           # Vue Router configuration
├── App.vue           # Root component and layout wrapper
└── main.ts           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (version 18+ recommended) installed on your machine.

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Note: The application relies on a local UI framework tarball (`phanna-ui-framework-1.0.1.tgz`). If you encounter missing dependencies, you can explicitly reinstall the framework:
   ```bash
   npm install ./phanna-ui-framework-1.0.1.tgz
   ```

### Development Server

Run the application locally:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### Build for Production

To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

## 🧪 Testing

This project maintains a robust testing suite to ensure high code quality, UI consistency, and regression prevention.

### Unit & Component Tests (Vitest & Vue Test Utils)
We use **Vitest** paired with **Vue Test Utils** to validate individual functions, services, and isolated Vue components.
- **Unit Tests**: Found in `tests/services/`, these tests independently verify core logic like date conversions, color management (`ThemeService`), and static data parsing (`HolidayService`).
- **Component Tests**: Found in `tests/components/` and `tests/views/`, these ensure that UI elements from `@phanna/ui-framework` render correctly, handle prop mutations, and emit the expected events.
- **Run Unit/Component Tests**:
  ```bash
  npm run test:unit
  ```

### End-to-End (E2E) Tests (Playwright)
We use **Playwright** to simulate real user interactions across the entire application workflow in a headless Chromium browser.
- These tests (located in the `e2e/` directory) validate critical user journeys like navigating between bottom tabs, dynamically opening BottomSheets when a calendar day is clicked, and selecting a new global theme color from the settings view.
- **Run E2E Tests**:
  ```bash
  npm run test:e2e
  ```
  *(Note: You may need to run `npx playwright install` before running these for the first time to download the necessary browser binaries.)*

### Automation Tests (CI/CD)
The testing suite is fully integrated into our **GitHub Actions** deployment pipeline.
- Whenever a push is made to the `main` branch, the `.github/workflows/deploy.yml` pipeline is triggered.
- The pipeline explicitly runs the Unit and Component test suite.
- **Deployment Blocker**: If any automated test fails, the GitHub Action automatically aborts the job, preventing faulty code from being built and deployed to the live GitHub Pages environment.

## 🎨 Architecture Highlights

- **`ThemeService.ts`**: An elegant service that manages CSS variables dynamically via the `:root` pseudo-class and safely persists user color preferences.
- **`HolidayService.ts`**: Provides a clean, static data source for national holidays, which the `MonthView.vue` naturally listens to via `@month-changed` emitted events.
- **`SettingsService.ts`**: A centralized, reactive state manager built with Vue's Composition API to manage user preferences like `popupStyle` and `firstDayOfWeek`.
- **Robust UI Fixes**: Incorporates advanced CSS fixes for dynamic UI components, such as `min-height: 0` constraints for flexbox overflow bugs, and `min(height, calc(100vh - 40px))` viewport bounding for mobile/tablet responsive islands.
- **Deep CSS Scoping & Specificity**: Utilizes Vue's `:deep()` compiler macros and global overrides to ensure framework components beautifully adopt user-selected theme colors and adapt to device viewports.

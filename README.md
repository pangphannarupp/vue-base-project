# Khmer Smart Calendar

A beautiful, modular, and fully featured smart calendar application tailored for the Cambodian context. Built with **Vue 3**, **Vite**, and **TypeScript**, this application seamlessly integrates the standard Gregorian calendar with the traditional Khmer lunar calendar, and offers extreme customization.

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

## 🎨 Architecture Highlights

- **`ThemeService.ts`**: An elegant service that manages CSS variables dynamically via the `:root` pseudo-class and safely persists user color preferences.
- **`HolidayService.ts`**: Provides a clean, static data source for national holidays, which the `MonthView.vue` naturally listens to via `@month-changed` emitted events.
- **`SettingsService.ts`**: A centralized, reactive state manager built with Vue's Composition API to manage user preferences like `popupStyle` and `firstDayOfWeek`.
- **Robust UI Fixes**: Incorporates advanced CSS fixes for dynamic UI components, such as `min-height: 0` constraints for flexbox overflow bugs, and `min(height, calc(100vh - 40px))` viewport bounding for mobile/tablet responsive islands.
- **Deep CSS Scoping & Specificity**: Utilizes Vue's `:deep()` compiler macros and global overrides to ensure framework components beautifully adopt user-selected theme colors and adapt to device viewports.

# Khmer Smart Calendar

A beautiful, modular, and fully featured smart calendar application tailored for the Cambodian context. Built with **Vue 3**, **Vite**, and **TypeScript**, this application seamlessly integrates the standard Gregorian calendar with the traditional Khmer lunar calendar.

## ✨ Features

- **Khmer Date Conversion**: Dynamically convert standard dates into full Khmer lunar dates, including lunar day, month, zodiac year (e.g., រោង - Dragon), and stem (e.g., ឆស័ក).
- **Public Holidays**: Includes a built-in `HolidayService` that categorizes and displays all major Cambodian national and international public holidays.
- **Zodiac Animal Integration**: Automatically computes and beautifully renders the correct zodiac animal icon for any given year.
- **Stateless Architecture**: Built with a highly modular, stateless component architecture (`EventItem`, `KhmerDateCard`, `ZodiacAnimalCard`, `WeatherCard`, etc.) making the application scalable and easy to test.
- **Modern UI Components**: Utilizes the custom `@phanna/ui-framework` to provide sleek elements like `BizSegment` for tabs and `BizYearPickerSheet` for elegant bottom-sheet year selections.
- **Khmer Typography**: Fully configured to use the beautiful **Battambang** font across the entire application interface.

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
├── components/       # Reusable, stateless UI components (e.g., EventItem.vue)
├── services/         # Business logic and data providers (e.g., HolidayService.ts)
├── views/            # Main application pages
│   ├── DayView.vue       # Daily breakdown with lunar details and zodiac
│   ├── EventsView.vue    # Grouped holiday and event list
│   ├── MonthView.vue     # Full calendar grid view
│   ├── MoreView.vue      # Settings and application configuration
│   ├── NewTaskView.vue   # Form to create new tasks/events
│   └── WeatherView.vue   # Location-based weather overview
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

- **`HolidayService.ts`**: Provides a clean, static data source for national holidays, separating data concerns from the view layer.
- **Event Bubbling Fixes**: Custom implementations for complex UI interactions, such as ensuring `BizYearPickerSheet` handles touch and click event propagation correctly without immediately dismissing.
- **Performance**: Heavy usage of computed properties and optimized Vite chunking ensures lightning-fast load times.

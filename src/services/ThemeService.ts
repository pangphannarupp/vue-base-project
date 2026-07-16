/**
 * សេវាកម្មសម្រាប់គ្រប់គ្រងពណ៌ស្បែកកម្មវិធី (Service for managing application theme colors)
 */
export class ThemeService {
  /** បញ្ជីពណ៌ (Array of theme color options) */
  static readonly THEME_COLORS: string[] = [
    '#f44336', '#e53935', '#d32f2f', // Reds
    '#e91e63', '#d81b60', '#c2185b', // Pinks
    '#9c27b0', '#8e24aa', '#7b1fa2', // Purples
    '#673ab7', '#5e35b1', '#512da8', // Deep Purples
    '#3f51b5', '#3949ab', '#303f9f', // Indigos
    '#2196f3', '#1e88e5', '#1976d2', // Blues
    '#03a9f4', '#039be5', '#0288d1', // Light Blues
    '#00bcd4', '#00acc1', '#0097a7', // Cyans
    '#009688', '#00897b', '#00796b', // Teals
    '#4caf50', '#43a047', '#388e3c', // Greens
    '#8bc34a', '#7cb342', '#689f38', // Light Greens
    '#cddc39', '#c0ca33', '#afb42b', // Limes
    '#ffeb3b', '#fdd835', '#fbc02d', // Yellows
    '#ffc107', '#ffb300', '#ffa000', // Ambers
    '#ff9800', '#fb8c00', '#f57c00', // Oranges
    '#ff5722', '#f4511e', '#e64a19', // Deep Oranges
    '#795548', '#6d4c41', '#5d4037', // Browns
    '#607d8b', '#546e7a', '#455a64', // Blue Greys
  ];

  /** លេខសោសម្រាប់ផ្ទុកក្នុង Local Storage (Local storage key) */
  private static readonly STORAGE_KEY = 'app_primary_theme_color';

  /** ពណ៌លំនាំដើម (Default theme color) */
  static readonly DEFAULT_COLOR = '#e53935';

  /**
   * អនុវត្តពណ៌ស្បែកថ្មី និងរក្សាទុក (Apply new theme color and save)
   * @param color កូដពណ៌ Hex (Hex color code)
   */
  static setTheme(color: string) {
    if (!color) return;
    document.documentElement.style.setProperty('--primary-theme-color', color);
    localStorage.setItem(this.STORAGE_KEY, color);
  }

  /**
   * ទាញយក និងអនុវត្តពណ៌ស្បែកដែលបានរក្សាទុក (Load and apply saved theme color)
   */
  static initTheme() {
    const savedColor = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_COLOR;
    document.documentElement.style.setProperty('--primary-theme-color', savedColor);
  }

  /**
   * យកពណ៌ស្បែកបច្ចុប្បន្ន (Get current theme color)
   */
  static getCurrentColor(): string {
    return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_COLOR;
  }
}

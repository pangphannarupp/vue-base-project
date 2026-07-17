import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ThemeService } from '../../src/services/ThemeService';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.removeProperty('--primary-theme-color');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.style.removeProperty('--primary-theme-color');
  });

  it('should get default color if no color is stored', () => {
    const color = ThemeService.getCurrentColor();
    expect(color).toBe(ThemeService.DEFAULT_COLOR);
  });

  it('should set theme color in DOM and localStorage', () => {
    const testColor = '#00bcd4';
    ThemeService.setTheme(testColor);

    expect(localStorage.getItem('app_primary_theme_color')).toBe(testColor);
    expect(document.documentElement.style.getPropertyValue('--primary-theme-color')).toBe(testColor);
  });

  it('should init theme from localStorage', () => {
    const testColor = '#4caf50';
    localStorage.setItem('app_primary_theme_color', testColor);
    
    ThemeService.initTheme();

    expect(document.documentElement.style.getPropertyValue('--primary-theme-color')).toBe(testColor);
  });

  it('should return the current color from localStorage', () => {
    const testColor = '#4caf50';
    localStorage.setItem('app_primary_theme_color', testColor);
    
    const color = ThemeService.getCurrentColor();
    expect(color).toBe(testColor);
  });

  it('has correct default color constant', () => {
    expect(ThemeService.DEFAULT_COLOR).toBe('#e53935');
  });
});

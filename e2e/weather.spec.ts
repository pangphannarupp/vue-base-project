import { test, expect } from '@playwright/test';

test.describe('Weather View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/weather');
  });

  test('renders weather header and locations', async ({ page }) => {
    await expect(page.locator('.weather-view')).toBeVisible();
    await expect(page.locator('h2:has-text("អាកាសធាតុ")')).toBeVisible();

    // Since it fetches data, it might show loading initially
    const loading = page.locator('text="កំពុងផ្ទុកទិន្នន័យ..."');
    if (await loading.isVisible()) {
      await expect(loading).toBeHidden({ timeout: 10000 }); // Wait for loading to finish
    }

    // Now cards should be visible
    const cards = page.locator('.weather-card');
    await expect(cards).toHaveCount(3); // Based on static locations configuration
    
    // Check if the first card contains 'ភ្នំពេញ'
    await expect(cards.nth(0)).toContainText('ភ្នំពេញ');
  });
});

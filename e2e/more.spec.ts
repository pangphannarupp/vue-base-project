import { test, expect } from '@playwright/test';

test.describe('More View Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/more');
  });

  test('renders MoreView correctly', async ({ page }) => {
    await expect(page.locator('.more-view')).toBeVisible();
    await expect(page.locator('text="Smart Calendar"')).toBeVisible();
    await expect(page.locator('text="Calendar Setting"')).toBeVisible();
  });

  test('opens theme color picker and selects a color', async ({ page }) => {
    // Click on Change Theme item
    await page.click('text="ផ្លាស់ប្តូរស្បែក"');

    // Bottom sheet should open with color grid
    const sheetHeader = page.locator('text="ជ្រើសរើសពណ៌ស្បែក"');
    await expect(sheetHeader).toBeVisible();

    // Click the first color swatch
    const firstColor = page.locator('.color-swatch').first();
    await firstColor.click();

    // Bottom sheet should close
    await expect(sheetHeader).toBeHidden();
  });
});

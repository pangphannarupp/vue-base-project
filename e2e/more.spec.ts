import { test, expect } from '@playwright/test';

test.describe('More View Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/more');
  });

  test('renders MoreView correctly', async ({ page }) => {
    await expect(page.locator('.more-view')).toBeVisible();
    await expect(page.locator('h1:has-text("ប្រតិទិនឆ្លាតវៃ")')).toBeVisible();
    await expect(page.getByText('Calendar Setting')).toBeVisible();
  });

  test('opens theme color picker and selects a color', async ({ page }) => {
    // Click on Change Theme item
    await page.getByText('ផ្លាស់ប្តូរស្បែក').click();

    // Bottom sheet should open with color grid
    const sheet = page.locator('.biz-bottom-sheet-container');
    await expect(sheet).toBeVisible();

    // Click the first color swatch
    const firstColor = page.locator('.color-swatch').first();
    await firstColor.click();

    // Click confirm button to apply the theme and close the sheet
    await page.getByText('យល់ព្រម').click();

    // Bottom sheet should close
    await expect(sheet).toBeHidden();
  });
});

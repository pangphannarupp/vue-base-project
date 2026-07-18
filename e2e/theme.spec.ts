import { test, expect } from '@playwright/test';

test.describe('Theme Settings', () => {
  test('should open theme picker and select a color', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Navigate to the More tab
    await page.click('text=ផ្សេងទៀត');

    // Ensure we're on the More view
    await expect(page.locator('h1:has-text("ប្រតិទិនឆ្លាតវៃ")')).toBeVisible();

    // Click the change theme button
    await page.click('text=ផ្លាស់ប្តូរស្បែក');

    // The theme picker should appear
    await expect(page.locator('text=ជ្រើសរើសពណ៌ស្បែក')).toBeVisible();

    // Click the first color option (usually a circular div inside the color grid)
    // We can target the grid items since they have specific classes or just use the first color swatch
    const firstColorSwatch = page.locator('.color-swatch').first();
    await expect(firstColorSwatch).toBeVisible();
    
    // Get the color value from the first swatch to verify later
    const colorStyle = await firstColorSwatch.getAttribute('style');
    // Assuming style is something like `background-color: rgb(...)`
    
    await firstColorSwatch.click();

    // Click confirm
    await page.click('text=យល់ព្រម');

    // The modal should close
    await expect(page.locator('text=ជ្រើសរើសពណ៌ស្បែក')).not.toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Month View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/month');
  });

  test('renders the calendar and events section', async ({ page }) => {
    // Check main container
    await expect(page.locator('.month-view')).toBeVisible();
    
    // Check header
    await expect(page.locator('h3:has-text("ព្រឹត្តិការណ៍")').first()).toBeVisible();
  });

  test('opens bottom sheet when a day is clicked', async ({ page }) => {
    // Look for a day element to click, usually text like "15" is safe.
    // If it's in a calendar, we just pick the first visible element that looks like a day.
    // We can use a generic click on a calendar cell if we don't know the exact class.
    
    // Attempt to click the number '15' (which should be somewhere in the calendar grid)
    const day15 = page.locator('text="15"').first();
    await day15.click();

    // Verify the bottom sheet becomes visible. Bottom sheet usually has .biz-bottom-sheet or .sheet-content
    await expect(page.locator('.sheet-content')).toBeVisible();
    
    // Verify date large text is present in the sheet
    await expect(page.locator('.date-large')).toBeVisible();
  });
});

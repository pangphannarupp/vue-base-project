import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between bottom tabs', async ({ page }) => {
    await page.goto('/');
    
    // Initial page should be 'day'
    await expect(page).toHaveURL(/.*\/$/);

    // Navigate to Month
    await page.locator('text="ខែ"').last().click();
    await expect(page).toHaveURL(/.*\/month/);
    await expect(page.locator('.month-view')).toBeVisible();

    // Navigate to Events
    await page.locator('text="ព្រឹត្តិការណ៍"').last().click();
    await expect(page).toHaveURL(/.*\/events/);
    await expect(page.locator('.events-view')).toBeVisible();

    // Navigate to Weather
    await page.locator('text="អាកាសធាតុ"').last().click();
    await expect(page).toHaveURL(/.*\/weather/);
    await expect(page.locator('.weather-view')).toBeVisible();

    // Navigate to More
    await page.locator('text="ផ្សេងទៀត"').last().click();
    await expect(page).toHaveURL(/.*\/more/);
    await expect(page.locator('.more-view')).toBeVisible();

    // Navigate back to Day
    await page.locator('text="ថ្ងៃ"').last().click();
    await expect(page).toHaveURL(/.*\/$/);
    await expect(page.locator('.day-view')).toBeVisible();
  });
});

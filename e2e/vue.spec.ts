import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  // Basic assertion, adjust based on actual content
  // Assuming the app has some main container or recognizable element.
  // Using a generic check for now.
  await expect(page.locator('#app')).toBeVisible();
});

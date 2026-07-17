import { test, expect } from '@playwright/test';

test.describe('New Task View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/new-task');
  });

  test('renders form elements and handles input', async ({ page }) => {
    await expect(page.locator('.new-task-view')).toBeVisible();
    // INTENTIONAL FAILURE FOR PULL REQUEST TEST
    await expect(page.locator('h2:has-text("FAILED_PR_MERGE_TEST")')).toBeVisible({ timeout: 1000 });

    // Verify input exists
    const input = page.locator('input[placeholder="បញ្ចូលចំណងជើង"]');
    await expect(input).toBeVisible();

    // Type into input
    await input.fill('សាកល្បងកិច្ចការថ្មី');
    await expect(input).toHaveValue('សាកល្បងកិច្ចការថ្មី');

    // Verify save button exists
    const saveBtn = page.locator('button:has-text("រក្សាទុក")');
    await expect(saveBtn).toBeVisible();

    // Click save
    await saveBtn.click();

    // In a real app this might redirect. We just verify the button is clickable and doesn't crash.
    // Wait a brief moment to ensure no errors
    await page.waitForTimeout(500);
  });
});

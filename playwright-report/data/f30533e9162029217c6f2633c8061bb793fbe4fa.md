# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-task.spec.ts >> New Task View >> renders form elements and handles input
- Location: e2e/new-task.spec.ts:8:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h2:has-text("LOCAL_FAILURE_TEST")')
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 1000ms
  - waiting for locator('h2:has-text("LOCAL_FAILURE_TEST")')

```

```yaml
- banner:
  - button "←"
  - heading "កិច្ចការថ្មី" [level=2]
- textbox "បញ្ចូលចំណងជើង"
- text: 🕑 ថ្ងៃនេះ, 9:11 PM
- button "រក្សាទុក"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('New Task View', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/new-task');
  6  |   });
  7  | 
  8  |   test('renders form elements and handles input', async ({ page }) => {
  9  |     await expect(page.locator('.new-task-view')).toBeVisible();
  10 |     // INTENTIONAL FAILURE FOR LOCAL PLAYWRIGHT REPORT
> 11 |     await expect(page.locator('h2:has-text("LOCAL_FAILURE_TEST")')).toBeVisible({ timeout: 1000 });
     |                                                                     ^ Error: expect(locator).toBeVisible() failed
  12 | 
  13 |     // Verify input exists
  14 |     const input = page.locator('input[placeholder="បញ្ចូលចំណងជើង"]');
  15 |     await expect(input).toBeVisible();
  16 | 
  17 |     // Type into input
  18 |     await input.fill('សាកល្បងកិច្ចការថ្មី');
  19 |     await expect(input).toHaveValue('សាកល្បងកិច្ចការថ្មី');
  20 | 
  21 |     // Verify save button exists
  22 |     const saveBtn = page.locator('button:has-text("រក្សាទុក")');
  23 |     await expect(saveBtn).toBeVisible();
  24 | 
  25 |     // Click save
  26 |     await saveBtn.click();
  27 | 
  28 |     // In a real app this might redirect. We just verify the button is clickable and doesn't crash.
  29 |     // Wait a brief moment to ensure no errors
  30 |     await page.waitForTimeout(500);
  31 |   });
  32 | });
  33 | 
```
const { test, expect } = require('@playwright/test')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173')

  const locator = await page.getByText('authenticate')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Scoring App')).toBeVisible()
})

test('login form can be opened', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173')

  await page.getByText('authenticate').click()
})

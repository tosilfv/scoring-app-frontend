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

  await page.getByRole('textbox').first().fill('joku@joku.com')
  await page.getByRole('textbox').last().fill('jokujoku')
  await page.getByRole('button', { name: 'login' }).click()

  await expect(page.getByText('my places')).toBeVisible()
})

test('register form can be opened', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173')

  await page.getByText('authenticate').click()
  await page.getByText('switch to signup').click()

  await page.getByRole('textbox').first().fill('test100')
  await page.getByRole('textbox').nth(1).fill('test100@test100.com')
  await page.getByRole('textbox').last().fill('test100')
  await page.getByRole('button', { name: 'signup' }).click()

  await expect(page.getByText('test100')).toBeVisible()
})

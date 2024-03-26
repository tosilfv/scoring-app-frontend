const { test, expect } = require('@playwright/test')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173')
  const locator = await page.getByText('authenticate')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Scoring App')).toBeVisible()
})

test('register and login forms can be opened', async ({ page, request }) => {
  await request.post('http://localhost:5000/api/testing/reset')
  await page.goto('http://127.0.0.1:5173')
  await page.getByText('authenticate').click()
  await page.getByText('switch to signup').click()
  await page.getByRole('textbox').first().fill('joku')
  await page.getByRole('textbox').nth(1).fill('joku@joku.com')
  await page.getByRole('textbox').last().fill('jokujoku')
  await page.getByRole('button', { name: 'signup' }).click()
  await expect(page.getByText('my places')).toBeVisible()
  await page.getByText('logout').click()
  await page.getByText('authenticate').click()
  await page.getByRole('textbox').first().fill('joku@joku.com')
  await page.getByRole('textbox').last().fill('jokujoku')
  await page.getByRole('button', { name: 'login' }).click()
  await expect(page.getByText('my places')).toBeVisible()
})

test('place can be added, edited and deleted', async ({ page, request }) => {
  // ADD
  await page.goto('http://127.0.0.1:5173')
  await page.getByText('authenticate').click()
  await page.getByRole('textbox').first().fill('joku@joku.com')
  await page.getByRole('textbox').last().fill('jokujoku')
  await page.getByRole('button', { name: 'login' }).click()
  await expect(page.getByText('my places')).toBeVisible()
  await page.getByText('add place').click()
  await page.getByRole('textbox').first().fill('a')
  await page.getByRole('textbox').nth(1).fill('aaaaa')
  await page.getByRole('textbox').last().fill('a')
  await page.getByRole('button', { name: 'add place' }).click()
  await page.getByText('joku').click()
  await expect(page.getByText('aaaaa')).toBeVisible()
  // EDIT
  await page.getByText('edit').click()
  await page.getByRole('textbox').first().fill('a1')
  await page.getByRole('textbox').last().fill('aaaaa1')
  await page.getByRole('button', { name: 'update place' }).click()
  await page.getByText('my places').click()
  await expect(page.getByText('aaaaa1')).toBeVisible()
  // DELETE
  await page.getByText('delete').click()
  await page.getByText('ok').click()
  await page.getByText('my places').click()
  await expect(page.getByText('aaaaa1')).not.toBeVisible()
  await expect(
    page.getByText('No places found. Maybe create one?')
  ).toBeVisible()
})

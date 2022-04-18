import { test } from '@playwright/test'

const {
  E2E_URL='http://localhost:19006/'
} = process.env

// Before each test, navigate to the sessions web app in a browser
test.beforeEach(async ({ page }) => {
  await page.goto(E2E_URL)
})

test.describe('Day Switch Toggle', () => {

  test('should increment the day', async ({ page }) => {
    await page.locator('role=button[name="increment day"]').click()

    // wait for the element to be visible (since it may take a half-second to appear, and these tests run very fast)
    await page.locator('role=heading[name="Day 2"]').waitFor()
  })

  test('should decrement the day', async ({ page }) => {
    await page.locator('role=button[name="increment day"]').click()
    await page.locator('role=heading[name="Day 2"]').waitFor()
    await page.locator('role=button[name="decrement day"]').click()
    await page.locator('role=heading[name="Day 1 - Introduction day"]').waitFor()
  })
})
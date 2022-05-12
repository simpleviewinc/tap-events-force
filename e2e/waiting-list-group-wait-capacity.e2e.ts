import { test, expect, devices } from '@playwright/test'

const {
  // Given I load the waitingList-group-waitCapacity state
  E2E_URL='http://localhost:19006/?state=waitingList-group-waitCapacity'
} = process.env

// Before each test, navigate to the sessions web app in a browser
test.beforeEach(async ({ page }) => {
  await page.goto(E2E_URL)
})

test.describe.configure({ mode: 'parallel' })

test.describe('FTR002 (Desktop) : Group Booking Waitlist', () => {

  test('UAC001 : When the booking modal loads then the booking-list remaining places message should say, "0 places remaining"', async ({ page }) => {

    // setup
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click();

    // expected outcome
    const placesRemainingMsg = await page.locator('text=0 places remaining').textContent()
    expect(placesRemainingMsg).toContain('0 places remaining')
    
  })

  test('UAC002 : When the booking modal loads and the booking-list is full and there is 1 remaining place on the waiting-list and another available attendee is checked then the waiting-list remaining places message should show and say, "Waiting list full"', async ({ page }) => {

    //setup
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked 

    //expected outcome
    const placesRemainingMsg = await page.locator('text=Waiting list full').textContent()
    expect(placesRemainingMsg).toContain('Waiting list full')

    
  })

  test('UAC003 : When the booking modal loads and the booking-list is full and the waiting-list is full then the remaining unchecked attendee checkboxes should be disabled and the selected attendee checkboxes should be enabled', async ({ page }) => {

    //setup
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked
    
    //expected outcome
    const frankCheckbox = await page.locator('role=button', { hasText: 'Mr Frank Smith' })
    await expect(frankCheckbox).toBeEnabled()

    const samanthaCheckbox = await page.locator('role=button', { hasText: 'Samantha' })
    await expect(samanthaCheckbox).toBeDisabled()

    const lucyCheckbox = await page.locator('role=button', { hasText: 'Dr Lucy Jones' })
    await expect(lucyCheckbox).toBeEnabled()

    const oliverCheckbox = await page.locator('role=button', { hasText: 'Oliver James' })
    await expect(oliverCheckbox).toBeEnabled()
    
  })

  test('UAC004 : When the booking modal loads and the booking-list is full and the waiting-list is full and a booked attendee is removed from the booking-list then the remaining places message should say, "1 place remaining"', async ({ page }) => {

    //setup
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked
    const oliverCheckbox = await page.locator('role=button', { hasText: 'Oliver James' })
    await oliverCheckbox.click()
    await expect(oliverCheckbox).not.toBeChecked
    
    //expected outcome
    const placesRemainingMsg = await page.locator('text=1 place remaining').textContent()
    expect(placesRemainingMsg).toContain('1 place remaining')
    
  })

  test('UAC005 : When the booking modal loads and the waiting-list is full and an attendee is removed from the waiting-list then the remaining places message should say, "0 places remaining"', async ({ page }) => {

    //setup
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked
    const lucyCheckbox = page.locator('role=button', { hasText: 'Dr Lucy Jones' })
    await lucyCheckbox.click()
    await expect(lucyCheckbox).not.toBeChecked
    
    //expected outcome
    const placesRemainingMsg = await page.locator('text=0 places remaining').textContent()
    expect(placesRemainingMsg).toContain('0 places remaining')
    
  })

})

test.describe('FTR002 (Mobile) : Group Booking Waitlist', () => {

  test('UAC001 : When the booking modal loads then the booking-list remaining places message should say, "0 places remaining"', async ({ page }) => {

    // setup
    await page.setViewportSize(devices['iPhone XR'].viewport)
    await page.locator('role=button[name="expand-Session with waiting list capacity"]').click()
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    
    // expected outcome
    const placesRemainingMsg = await page.locator('text=0 places remaining').textContent()
    expect(placesRemainingMsg).toContain('0 places remaining')
    
  })

  test('UAC002 : When the booking modal loads and the booking-list is full and there is 1 remaining place on the waiting-list and another available attendee is checked then the waiting-list remaining places message should show and say, "Waiting list full"', async ({ page }) => {

    //setup
    await page.setViewportSize(devices['iPhone XR'].viewport)
    await page.locator('role=button[name="expand-Session with waiting list capacity"]').click()
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked 

    //expected outcome
    const placesRemainingMsg = await page.locator('text=Waiting list full').textContent()
    expect(placesRemainingMsg).toContain('Waiting list full')

  })

  test('UAC003 : When the booking modal loads and the booking-list is full and the waiting-list is full then the remaining unchecked attendee checkboxes should be disabled and the selected attendee checkboxes should be enabled', async ({ page }) => {

    //setup
    await page.setViewportSize(devices['iPhone XR'].viewport)
    await page.locator('role=button[name="expand-Session with waiting list capacity"]').click()
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked
    
    //expected outcome
    const frankCheckbox = await page.locator('role=button', { hasText: 'Mr Frank Smith' })
    await expect(frankCheckbox).toBeEnabled()

    const samanthaCheckbox = await page.locator('role=button', { hasText: 'Samantha' })
    await expect(samanthaCheckbox).toBeDisabled()

    const lucyCheckbox = await page.locator('role=button', { hasText: 'Dr Lucy Jones' })
    await expect(lucyCheckbox).toBeEnabled()

    const oliverCheckbox = await page.locator('role=button', { hasText: 'Oliver James' })
    await expect(oliverCheckbox).toBeEnabled()
    
  })

  test('UAC004 : When the booking modal loads and the booking-list is full and the waiting-list is full and a booked attendee is removed from the booking-list then the remaining places message should say, "1 place remaining"', async ({ page }) => {

    //setup
    await page.setViewportSize(devices['iPhone XR'].viewport)
    await page.locator('role=button[name="expand-Session with waiting list capacity"]').click()
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked
    const oliverCheckbox = await page.locator('role=button', { hasText: 'Oliver James' })
    await oliverCheckbox.click()
    await expect(oliverCheckbox).not.toBeChecked
    
    //expected outcome
    const placesRemainingMsg = await page.locator('text=1 place remaining').textContent()
    expect(placesRemainingMsg).toContain('1 place remaining')
    
  })

  test('UAC005 : When the booking modal loads and the waiting-list is full and an attendee is removed from the waiting-list then the remaining places message should say, "0 places remaining"', async ({ page }) => {

    //setup
    await page.setViewportSize(devices['iPhone XR'].viewport)
    await page.locator('role=button[name="expand-Session with waiting list capacity"]').click()
    await page.locator('role=button', { hasText: 'ON WAITING LIST 2' }).click()
    const teresaCheckbox = page.locator('role=button', { hasText: 'Ms. Teresa Waiting' })
    await teresaCheckbox.click()
    await expect(teresaCheckbox).toBeChecked
    const lucyCheckbox = page.locator('role=button', { hasText: 'Dr Lucy Jones' })
    await lucyCheckbox.click()
    await expect(lucyCheckbox).not.toBeChecked
    
    //expected outcome
    const placesRemainingMsg = await page.locator('text=0 places remaining').textContent()
    expect(placesRemainingMsg).toContain('0 places remaining')
    
  })

})
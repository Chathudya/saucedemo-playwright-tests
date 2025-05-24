const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { prepareCheckout } = require('../utils/checkoutHelper');
const { captureScreenshot } = require('../utils/screenshotHelper');

// Tag the entire suite
test.describe.configure({ mode: 'serial' });

test.describe('@form @validation Form Validation & Error Handling Suite', () => {

  const runWithScreenshot = (name, fn) =>
    test(name, async ({ page }) => {
      try {
        await fn(page);
      } catch (error) {
        await captureScreenshot(page, `form/${name.replace(/\s+/g, '_')}`);
        throw error;
      }
    });

  runWithScreenshot('@login @negative TC-FV-001: Empty login form submission', async (page) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
    await expect(login.errorMessage).toContainText('Username is required');
  });

  runWithScreenshot('@login @negative TC-FV-002: Only username provided', async (page) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', '');
    await expect(login.errorMessage).toContainText('Password is required');
  });

  runWithScreenshot('@login @negative TC-FV-003: Only password provided', async (page) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', 'secret_sauce');
    await expect(login.errorMessage).toContainText('Username is required');
  });

  runWithScreenshot('@login @negative TC-FV-004: Invalid username and password', async (page) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('invalid_user', 'invalid_pass');
    await expect(login.errorMessage).toBeVisible();
  });

  runWithScreenshot('@login @ui TC-FV-005: Close error message on login screen', async (page) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
    await expect(login.errorMessage).toBeVisible();
    await page.click('.error-button');
    await expect(login.errorMessage).toBeHidden();
  });

  runWithScreenshot('@checkout @negative TC-FV-006: Submit checkout with all fields empty', async (page) => {
    await prepareCheckout(page);
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('', '', '');
    await checkout.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toHaveText(/First Name is required/i);
  });

  runWithScreenshot('@checkout @negative TC-FV-007: Only first name given in checkout', async (page) => {
    await prepareCheckout(page);
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('John', '', '');
    await checkout.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toHaveText(/Last Name is required/i);
  });

  runWithScreenshot('@checkout @negative TC-FV-008: Missing zip code in checkout', async (page) => {
    await prepareCheckout(page);
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('Jane', 'Doe', '');
    await checkout.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toHaveText(/Postal Code is required/i);
  });

  runWithScreenshot('@checkout @ui TC-FV-009: Error disappears after correction', async (page) => {
    await prepareCheckout(page);
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('', '', '');
    await checkout.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    await checkout.enterUserDetails('John', 'Smith', '12345');
    await checkout.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toBeHidden();
  });

});

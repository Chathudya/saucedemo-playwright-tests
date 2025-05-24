const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { prepareCheckout } = require('../utils/checkoutHelper');
const { captureScreenshot } = require('../utils/screenshotHelper');

test.describe('Checkout Process Flow (Refactored)', () => {
  const runWithScreenshot = (name, fn) =>
    test(name, async ({ page }) => {
      try {
        await prepareCheckout(page);
        await fn(page);
      } catch (error) {
        await captureScreenshot(page, `checkout/${name.replace(/\s+/g, '_')}`);
        throw error;
      }
    });

  runWithScreenshot('@checkout @sanity TC-CHK-001: Start checkout from cart', async (page) => {
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  runWithScreenshot('@checkout @sanity TC-CHK-002: Continue with valid user details', async (page) => {
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('John', 'Doe', '12345');
    await checkout.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two.html/);
  });

  runWithScreenshot('@checkout @regression TC-CHK-003: Complete the checkout flow', async (page) => {
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('Jane', 'Smith', '54321');
    await checkout.continueCheckout();
    await checkout.completeOrder();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });

  runWithScreenshot('@checkout @ui TC-CHK-004: Cancel during checkout step one', async (page) => {
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.cancelStepOne();
    await expect(page).toHaveURL(/cart.html/);
  });

  runWithScreenshot('@checkout @ui TC-CHK-005: Cancel during checkout step two', async (page) => {
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('Cancel', 'Test', '00000');
    await checkout.continueCheckout();
    await checkout.cancelStepTwo();
    await expect(page).toHaveURL(/inventory.html/);
  });

  runWithScreenshot('@checkout @validation TC-CHK-006: Show error when fields are empty', async (page) => {
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('', '', '');
    await checkout.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  runWithScreenshot('@checkout @sanity TC-CHK-007: Verify item subtotal, tax and total are visible', async (page) => {
    const checkout = new CheckoutPage(page);
    await checkout.startCheckout();
    await checkout.enterUserDetails('Bill', 'Check', '22222');
    await checkout.continueCheckout();
    await expect(checkout.summarySubtotal).toBeVisible();
    await expect(checkout.summaryTax).toBeVisible();
    await expect(checkout.summaryTotal).toBeVisible();
  });
});

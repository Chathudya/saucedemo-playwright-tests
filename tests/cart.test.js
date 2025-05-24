const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/CartPage');
const { loginAsStandardUser } = require('../utils/loginHelper');
const { captureScreenshot } = require('../utils/screenshotHelper');

test.describe('Add to Cart & Cart Summary Tests', () => {
  const runWithScreenshot = (name, fn) =>
    test(name, async ({ page }) => {
      try {
        await loginAsStandardUser(page);
        await fn(page);
      } catch (error) {
        await captureScreenshot(page, `cart/${name.replace(/\s+/g, '_')}`);
        throw error;
      }
    });

  // TC-CART-001
  runWithScreenshot('TC-CART-001: Add a single item updates badge count to 1', async (page) => {
    const cart = new CartPage(page);
    await cart.addItem(0);
    expect(await cart.getBadgeCount()).toBe(1);
  });

  // TC-CART-002
  runWithScreenshot('TC-CART-002: Add multiple items updates badge correctly', async (page) => {
    const cart = new CartPage(page);
    await cart.addMultipleItems([0, 1, 2]);
    expect(await cart.getBadgeCount()).toBe(3);
  });

  // TC-CART-003
  runWithScreenshot('TC-CART-003: Remove item updates badge count', async (page) => {
    const cart = new CartPage(page);
    await cart.addMultipleItems([0, 1]);
    await cart.removeItem(0);
    expect(await cart.getBadgeCount()).toBe(1);
  });

  // TC-CART-004
  runWithScreenshot('TC-CART-004: Cart item list matches added items', async (page) => {
    const cart = new CartPage(page);
    await cart.addMultipleItems([0, 1]);
    await cart.goToCart();
    expect(await cart.getCartItemCount()).toBe(2);
  });

  // TC-CART-005
  runWithScreenshot('TC-CART-005: Cart icon navigates to cart page', async (page) => {
    const cart = new CartPage(page);
    await cart.addItem(0);
    await cart.goToCart();
    await expect(page).toHaveURL(/cart.html/);
  });

  // TC-CART-006
  runWithScreenshot('TC-CART-006: Product name and price match in cart', async (page) => {
    const cart = new CartPage(page);
    const name = await cart.page.locator('.inventory_item_name').nth(0).textContent();
    const price = await cart.page.locator('.inventory_item_price').nth(0).textContent();
    await cart.addItem(0);
    await cart.goToCart();
    await expect(cart.cartItemName.nth(0)).toHaveText(name);
    await expect(cart.cartItemPrice.nth(0)).toHaveText(price);
  });

  // TC-CART-007
  runWithScreenshot('TC-CART-007: Empty cart shows no items', async (page) => {
    const cart = new CartPage(page);
    await cart.goToCart();
    expect(await cart.getCartItemCount()).toBe(0);
  });

  // TC-CART-008
  runWithScreenshot('TC-CART-008: Cart badge disappears when empty', async (page) => {
    const cart = new CartPage(page);
    await cart.addItem(0);
    await cart.removeItem(0);
    const visible = await cart.cartBadge.isVisible().catch(() => false);
    expect(visible).toBe(false);
  });
});

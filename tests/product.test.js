const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Product Listing and Details', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  // TC-PLD-001
  test('TC-PLD-001: All products should be visible', async ({ page }) => {
    const products = new ProductPage(page);
    await expect(products.inventoryItems).toHaveCount(6);
  });

  // TC-PLD-002
  test('TC-PLD-002: Each product should have name, price, image', async ({ page }) => {
    const products = new ProductPage(page);
    const count = await products.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      await expect(products.productNames.nth(i)).not.toBeEmpty();
      await expect(products.productPrices.nth(i)).not.toBeEmpty();
      await expect(products.productImages.nth(i)).toBeVisible();
    }
  });

  // TC-PLD-003
  test('TC-PLD-003: Clicking on product name navigates to detail page', async ({ page }) => {
    const products = new ProductPage(page);
    await products.selectProduct(0);
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(products.productDetailName).toBeVisible();
  });

  // TC-PLD-004
  test('TC-PLD-004: Back to Products button navigates back', async ({ page }) => {
    const products = new ProductPage(page);
    await products.selectProduct(0);
    await products.backToProducts();
    await expect(page).toHaveURL(/inventory.html/);
  });

  // TC-PLD-005
  test('TC-PLD-005: Product description should be visible', async ({ page }) => {
    const products = new ProductPage(page);
    await products.selectProduct(0);
    await expect(products.productDescription).not.toBeEmpty();
  });

  // TC-PLD-006
  test('TC-PLD-006: Product price matches list and detail', async ({ page }) => {
    const products = new ProductPage(page);
    const listPrice = await products.productPrices.nth(0).textContent();
    await products.selectProduct(0);
    const detailPrice = await products.productDetailPrice.textContent();
    expect(listPrice).toEqual(detailPrice);
  });

  // TC-PLD-007
  test('TC-PLD-007: Product images are not broken', async ({ page }) => {
    const products = new ProductPage(page);
    const count = await products.productImages.count();
    for (let i = 0; i < count; i++) {
      const image = products.productImages.nth(i);
      const src = await image.getAttribute('src');
      expect(src).toMatch(/\.jpg|\.png/);
    }
  });

});

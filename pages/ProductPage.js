const locators = require('./locators/ProductLocators');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator(locators.inventoryItem);
    this.productNames = page.locator(locators.productName);
    this.productPrices = page.locator(locators.productPrice);
    this.productImages = page.locator(locators.productImage);
    this.productDescription = page.locator(locators.productDescription);
    this.productDetailName = page.locator(locators.productDetailName);
    this.productDetailPrice = page.locator(locators.productDetailPrice);
    this.backToProductsButton = page.locator(locators.backToProductsButton);
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async selectProduct(index = 0) {
    await this.productNames.nth(index).click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}

module.exports = { ProductPage };

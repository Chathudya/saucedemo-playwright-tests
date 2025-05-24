const locators = require('./locators/CartLocators');

class CartPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator(locators.addToCartButtons);
    this.cartBadge = page.locator(locators.cartBadge);
    this.cartIcon = page.locator(locators.cartIcon);
    this.cartItems = page.locator(locators.cartItem);
    this.cartItemName = page.locator(locators.cartItemName);
    this.cartItemPrice = page.locator(locators.cartItemPrice);
    this.removeFromCartButtons = page.locator(locators.removeFromCartButtons);
  }

  async addItem(index = 0) {
    await this.addToCartButtons.nth(index).click();
  }

  async addMultipleItems(indices) {
    for (const i of indices) {
      await this.addToCartButtons.nth(i).click();
    }
  }

  async removeItem(index = 0) {
    await this.removeFromCartButtons.nth(index).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getBadgeCount() {
    return await this.cartBadge.isVisible() ? parseInt(await this.cartBadge.textContent()) : 0;
  }
}

module.exports = { CartPage };

const locators = require('./locators/CheckoutLocators');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator(locators.checkoutButton);
    this.firstNameInput = page.locator(locators.firstNameInput);
    this.lastNameInput = page.locator(locators.lastNameInput);
    this.zipCodeInput = page.locator(locators.zipCodeInput);
    this.continueButton = page.locator(locators.continueButton);
    this.cancelButtonStep1 = page.locator(locators.cancelButtonStep1);
    this.cancelButtonStep2 = page.locator(locators.cancelButtonStep2);
    this.finishButton = page.locator(locators.finishButton);
    this.completeHeader = page.locator(locators.completeHeader);
    this.summarySubtotal = page.locator(locators.summarySubtotal);
    this.summaryTax = page.locator(locators.summaryTax);
    this.summaryTotal = page.locator(locators.summaryTotal);
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async enterUserDetails(first = '', last = '', zip = '') {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.zipCodeInput.fill(zip);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async cancelStepOne() {
    await this.cancelButtonStep1.click();
  }

  async cancelStepTwo() {
    await this.cancelButtonStep2.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };

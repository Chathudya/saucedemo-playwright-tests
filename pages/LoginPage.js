
const locators = require('./locators/LoginLocators');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locators.usernameInput);
    this.passwordInput = page.locator(locators.passwordInput);
    this.loginButton = page.locator(locators.loginButton);
    this.errorMessage = page.locator(locators.errorMessage);
    this.errorCloseButton = page.locator(locators.errorCloseButton);
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username, password) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async pressEnterLogin(username, password) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.passwordInput.press('Enter');
  }

  async clearFields() {
    await this.usernameInput.fill('');
    await this.passwordInput.fill('');
  }
}

module.exports = { LoginPage };

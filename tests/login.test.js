const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { captureScreenshot } = require('../utils/screenshotHelper');
const users = require('../data/users.json');

test.describe('Login Page - All Scenarios (Refactored)', () => {
  const baseUrl = 'https://www.saucedemo.com';

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  const runWithScreenshot = (name, fn) =>
    test(name, async ({ page }) => {
      try {
        await fn(page);
      } catch (err) {
        await captureScreenshot(page, name.replace(/\s+/g, '_'));
        throw err;
      }
    });

  runWithScreenshot('TC-LP-001: Valid login redirects to inventory', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(`${baseUrl}/inventory.html`);
  });

  runWithScreenshot('TC-LP-002: Login using Enter key', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.pressEnterLogin(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(`${baseUrl}/inventory.html`);
  });

  runWithScreenshot('TC-LP-003: Login button is clickable after filling inputs', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.usernameInput.fill(users.standardUser.username);
    await loginPage.passwordInput.fill(users.standardUser.password);
    await expect(loginPage.loginButton).toBeEnabled();
  });

  runWithScreenshot('TC-LP-004: Verify URL after login', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(`${baseUrl}/inventory.html`);
  });

  runWithScreenshot('TC-LP-005: Invalid password shows error', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standardUser.username, 'wrongpass');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  runWithScreenshot('TC-LP-006: Invalid username shows error', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('wrong_user', users.standardUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  runWithScreenshot('TC-LP-007: Both username and password invalid', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('wrong_user', 'wrong_pass');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  runWithScreenshot('TC-LP-008: Empty username and password', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.clearFields();
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  runWithScreenshot('TC-LP-009: Only username entered', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standardUser.username, '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  runWithScreenshot('TC-LP-010: Only password entered', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', users.standardUser.password);
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  runWithScreenshot('TC-LP-011: Locked-out user shows locked message', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  runWithScreenshot('TC-LP-012: Error message closes on click', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await loginPage.errorCloseButton.click();
    await expect(loginPage.errorMessage).toBeHidden();
  });

  runWithScreenshot('TC-LP-013: Retry after failed login should succeed', async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standardUser.username, 'wrongpass');
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.clearFields();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(`${baseUrl}/inventory.html`);
  });

  test.describe.configure({ mode: 'parallel' });

for (let i = 0; i < 10; i++) {
  test(`Simulate user session ${i + 1}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory.html/);
  });
}


});

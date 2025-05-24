const { LoginPage } = require('../pages/LoginPage');
const users = require('../data/users.json');

async function loginAsStandardUser(page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standardUser.username, users.standardUser.password);
}

module.exports = { loginAsStandardUser };

require('dotenv').config();

module.exports = {
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: true,
  },
  retries: 1,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
};

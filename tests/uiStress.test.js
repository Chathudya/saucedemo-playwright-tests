const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

test.describe('@stress UI Stress Simulation - Concurrent User Login', () => {
  const totalSessions = 5; // Change this to 10 or more if needed

  for (let i = 1; i <= totalSessions; i++) {
    test(`User Session ${i}: Login and measure performance`, async ({ page }) => {
      const sessionLabel = `Session-${i}`;
      console.time(sessionLabel);

      await page.goto('https://www.saucedemo.com');
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#password').fill('secret_sauce');
      await page.locator('#login-button').click();

      await expect(page).toHaveURL(/inventory\.html/);

      console.timeEnd(sessionLabel);

      const timing = await page.evaluate(() => {
        const { navigationStart, domContentLoadedEventEnd, loadEventEnd } = performance.timing;
        return {
          domLoad: domContentLoadedEventEnd - navigationStart,
          fullLoad: loadEventEnd - navigationStart,
        };
      });

      console.log(`📊 ${sessionLabel} | DOM Load: ${timing.domLoad} ms | Full Load: ${timing.fullLoad} ms`);
      expect(timing.fullLoad).toBeLessThan(3000); // Optional performance threshold
    });
  }
});

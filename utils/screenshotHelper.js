const fs = require('fs');

async function captureScreenshot(page, testName) {
  const dir = 'screenshots';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  await page.screenshot({ path: `${dir}/${testName}.png`, fullPage: true });
}

module.exports = { captureScreenshot };

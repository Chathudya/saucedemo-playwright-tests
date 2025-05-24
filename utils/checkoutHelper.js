const { CartPage } = require('../pages/CartPage');
const { loginAsStandardUser } = require('./loginHelper');

async function prepareCheckout(page) {
  await loginAsStandardUser(page);
  const cart = new CartPage(page);
  await cart.addItem(0);
  await cart.goToCart();
}

module.exports = { prepareCheckout };

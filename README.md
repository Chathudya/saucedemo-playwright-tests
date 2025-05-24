# 🧪 saucedemo-playwright-tests

Automated UI testing framework for [SauceDemo](https://www.saucedemo.com) built using **Playwright** with the **Page Object Model (POM)** structure. Covers login, product interactions, cart, checkout, and form validation — including a stress test simulation.

---

## 📁 Project Structure

```
saucedemo-playwright-tests/
├── tests/                  # Test specs
│   ├── login.test.js
│   ├── product.test.js
│   ├── cart.test.js
│   ├── checkout.test.js
│   ├── formValidation.test.js
│   └── uiStress.test.js
├── pages/                  # Page Object files
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── locators/           # Element locators
├── utils/                  # Utility functions
│   ├── loginHelper.js
│   ├── checkoutHelper.js
│   ├── screenshotHelper.js
│   └── csvReader.js
├── playwright.config.js    # Playwright configuration
├── README.md               # You're here
└── package.json
```

---

## ✅ Test Coverage

| Feature           | Test File               | Status |
|------------------|-------------------------|--------|
| Login (positive/negative) | `login.test.js`           | ✅     |
| Product Listing / Add to Cart | `product.test.js`, `cart.test.js` | ✅     |
| Checkout Workflow | `checkout.test.js`     | ✅     |
| Form Validation   | `formValidation.test.js`| ✅     |
| UI Stress Simulation | `uiStress.test.js`   | ✅     |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests

```bash
npx playwright test
```

### 3. View test report

```bash
npx playwright show-report
```

---

## 🧪 Stress Testing

The `uiStress.test.js` simulates repeated login + browsing scenarios to observe UI responsiveness under load.

You can increase the loop count or run it headless for performance benchmarks.


---

## 🧠 Author

**Chathudya Jayawardana**  
💼 QA Engineer  
📍 Sri Lanka

---

## 📜 License

This project is open-source

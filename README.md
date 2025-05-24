# 🧪 SauceDemo E2E Automation Project

This repository contains an end-to-end test automation framework built for testing the [SauceDemo](https://www.saucedemo.com) web application. The framework is designed using modern tooling, scalable architecture (POM), and enhanced with AI tools for speed and precision.

---

## 🚀 Tools & Tech Stack

| Category       | Tool/Library            |
|----------------|-------------------------|
| Language       | JavaScript (ES6)        |
| Framework      | [Playwright](https://playwright.dev/) |
| Assertion      | Playwright Test         |
| Architecture   | Page Object Model (POM) |
| CI/CD          | GitHub Actions          |
| Reporting      | HTML (Playwright Reporter) |
| AI Assistance  | ChatGPT (OpenAI GPT-4)  |

---

## 🧠 Test Strategy & Assumptions

### ✅ Coverage Areas
- Login Page (positive & negative flows)
- Product Listing & Product Detail Pages
- Add to Cart & Cart Summary
- Checkout (continue, cancel, complete)
- Form Validation & Error Handling

### 🧱 Test Design Principles
- Each page uses its own **Page Object** for modularity and reusability
- Locators are stored separately for easy maintenance
- Tags like `@sanity`, `@regression`, `@negative`, and `@validation` enable suite-based execution via `--grep`

### 🧪 Execution Modes
- Run full suite: `npx playwright test`
- Run by tag: `npx playwright test --grep "@sanity"`
- Run specific file: `npx playwright test tests/login.test.js`
- Run in UI mode: `npx playwright test --ui`

---

## 🤖 AI Tools Leveraged

| Area | How AI Was Used |
|------|------------------|
| Test Case Design | Generated and refined test scenarios for real-world relevance |
| Automation Coding | Rapid generation of POM classes, locators, and test logic |
| Optimization | Refactored test structure for scalability and readability |
| CI Integration | Helped create GitHub Actions YAML and reporting setup |

AI (ChatGPT-4) served as a **pair programmer + QA strategist**, speeding up delivery and reducing redundant work.

---

## 📦 CI/CD Setup

GitHub Actions automatically runs:
- On every `push` or `pull_request` to `main`
- Generates and uploads a test report artifact

See `.github/workflows/playwright.yml` for config.

---

## 🧭 Directory Structure
saucedemo_tests/
├── pages/ # Page Objects & Locators
│ ├── LoginPage.js
│ ├── CartPage.js
│ ├── ProductPage.js
│ └── CheckoutPage.js
├── tests/ # All test scenarios grouped
│ ├── login.test.js
│ ├── product.test.js
│ ├── cart.test.js
│ ├── checkout.test.js
│ └── formValidation.test.js
├── playwright.config.js
└── .github/workflows/ # GitHub Actions CI config


---

## 📋 Future Enhancements

- Add environment config and test data abstraction
- Implement visual regression testing
- Parallel test execution with CI matrix
- Integrate with Allure or TestRail

---

## 📧 Contact

**Author**: Chathudya Jayawardana  
**Role**: QA Engineer 
**Connect**: [LinkedIn](#) | [Email](#)  

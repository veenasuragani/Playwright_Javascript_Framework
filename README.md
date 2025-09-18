# Playwright JavaScript Testing Framework
![GitHub Stars](https://img.shields.io/github/stars/dvhiremath26/playwright-javascript-framework?style=social)
[![Regression-Testing](https://github.com/dvhiremath26/Playwright-Javascript-Framework/actions/workflows/regression-testing.yml/badge.svg)](https://github.com/dvhiremath26/Playwright-Javascript-Framework/)
[![Playwright HTML Report](https://img.shields.io/badge/Playwright_HTML-Test_Report-purple)](https://dvhiremath26.github.io/Playwright-Javascript-Framework/)
![Languages](https://img.shields.io/github/languages/top/dvhiremath26/playwright-javascript-framework)
![Open Issues](https://img.shields.io/github/issues/dvhiremath26/playwright-javascript-framework)
![Pull Requests](https://img.shields.io/github/issues-pr/dvhiremath26/playwright-javascript-framework)


This repository contains a Playwright JavaScript framework designed to automate testing for a web application. Using the Page Object Model (POM) design pattern, this framework covers various end-to-end scenarios including session storage, form fills, login/logout, dropdowns, checkboxes, radio buttons, calendars, web tables, JavaScript alerts, popups, and multi-window handling. The setup includes configurations for both browser specific and cross-browser testing.

## Table of Contents
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Setup and Installation](#setup-and-installation)
- [Running Tests](#running-tests)
- [Supported Scenarios](#supported-scenarios)
- [Configuration Details](#configuration-details)
- [Test Reports](#test-reports)
- [Continuous Integration](#continuous-integration)

## Getting Started

This framework uses Playwright for JavaScript to perform automation testing for web applications. Follow the instructions below to set up, configure, and run tests.


### Project Structure

- `tests/` - Contains test scripts for various scenarios.
- `locators/` - Contains json files for each page which conatins respective page locators.
- `pages/` - Implements the Page Object Model (POM) structure, with separate files for each page of the web application.
- `storageState/` - Contains storage session json files.
- `testData/` - Contains test data.
- `playwright.config.js` - Configuration file for Playwright, setting up browsers, test directories, and cross-browser support.
- `tests/login.setup.js` - Stores session data for reuse the session/authenticated tests.


### Environment Variables

The following environment variables are used in the project, and their values are stored as GitHub Secrets for enhanced security and easier management. You can set up these environment variables in your GitHub repository's Secrets section to use them during workflows such as CI/CD.

#### GitHub Secrets Configuration:
1. Go to your GitHub repository.
2. Navigate to **Settings** → **Secrets** → **New repository secret**.
3. Add the following secrets:

| Secret Name       | Secret Value      | Description         |
|-------------------|-------------------|---------------------|
| `STAGE_URL`        | https://example.com | The URL of your testing application |
| `LOGIN_EMAIL`           | your email        | A valid email for authentication |
| `LOGIN_PASSWORD`        | your password     | A valid password for authentication |

#### Using Environment Variables in Playwright:
These GitHub secrets will be automatically injected into the environment during test execution, and you can access them directly in your test scripts or Playwright configuration files.

Example of accessing these environment variables in `playwright.config.js`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'example-project',
      use: {
        baseURL: process.env.STAGE_URL,  // Access the TEST_URL secret
      },
    },
  ],
});
```

### Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dvhiremath26/Playwright-Javascript-Framework.git  

2. **Install dependencies:**
   ```bash
   npm install

3. **Install browsers**
   ```bash
   npx playwright install

### Running Tests

1. Run tests with chromium browser
   ```bash
   npx playwright test --project=chromium

2. Run tests with firefox browser
   ```bash
   npx playwright test --project=firefox

3. Run tests with webkit browser
   ```bash
   npx playwright test --project=webkit

4. Run tests with cross-browsers
   ```bash
   npx playwright test

### Supported Scenarios
This framework covers the following testing scenarios:

- Session Storage: Storing and re-using the login session.
- Form Handling: Filling and submitting forms
- Login and Logout: Authentication flow
- Dropdowns: Selecting options form dropdown and Multiselct dropdowns
- Checkboxes and Radio Buttons: Selection handling
- Calendars: Date selection
- Web Tables: Table interaction
- JavaScript Alerts: Alert handling (accept, dismiss)
- Popups and Modals: Popup interaction
- Multi-Window Handling: Switching between multiple windows/tabs

### Configuration Details

- **Session Storage**: 
  The session is stored using Playwright's `storageState()` built-in function. This allows for session reuse across test suites, enabling authenticated tests to run without needing to log in every time. The session data is saved in JSON format and can be accessed from the `storageState/` folder.

  Example configuration in `playwright.config.js`:
  ```js
  project: [
  {
    name: 'smoke',
    use: {
      storageState: 'storageState/smoke-session.json', // Path to session file
    },
  }
  ]
  ```

- **Suite Dependencies**:
  In this framework, test suites are set up with dependencies to ensure that a suite runs only after its dependent suite/test has completed. This allows you to control the 
  order of execution between different suites and ensure that prerequisites (like login) are completed before running dependent tests.

   To implement suite dependencies, use the `dependencies` configuration in `playwright.config.js`. The `dependencies` field specifies which suite(s) must complete before      the current suite can run.

   Example Configuration in `playwright.config.js`::

   In the following example, the `smoke` test suite depends on the `login` suite. The `smoke` suite will only run after the `login` suite has successfully executed.

   ```js
   projects: [
     {
       name: 'smoke',
       testMatch: '**/*/smoke.spec.js',  // Path to the smoke test suite
       dependencies: ['login'], // The smoke suite will run only after the login suite has completed
     },
     {
       name: 'login',
       testMatch: '**/*/login.spec.js',  // Path to the login test suite
     },
   ]
   ```

### Test Reports
This framework contains built-in playwright html report and implemented Allure report.

1. **Open Playwright html report:**
   ```bash
   npx playwright shoow-report 

2. **Open Allure report:**
   ```bash
   allure serve allure-results

### Continuous Integration

The framework is integrated with **GitHub Actions** for automated test execution and report generation. Below is the setup for CI workflows:

#### 1. **Regression-Testing Workflow**
The `regression-testing.yml` workflow executes the test suite and generates test reports.

- **Trigger**: The workflow runs on every push to the `main` branch or when a pull request is opened.

- **Steps**:
  - Set up the testing environment.
  - Install dependencies and browsers.
  - Execute the test suite.
  - Generate and upload Playwright HTML reports.

#### 2. **Publishing Playwright Report to GitHub Pages**
The Playwright report is automatically published to GitHub Pages after every successful CI run. This allows easy access to the latest test results via a browser.

**View Report**: [Playwright HTML Report](https://dvhiremath26.github.io/Playwright-Javascript-Framework/)

#### 3. **How to Configure**
Ensure the following steps are completed in your GitHub repository:
1. Enable GitHub Pages:
   - Navigate to **Settings** → **Pages**.
   - Select the `GitHub Actions` under the source.
   - Save the settings.

2. Include a GitHub Actions workflow file (e.g., `regression-testing.yml`) with steps to:
   - Install Playwright.
   - Run tests.
   - Generate Playwright HTML reports.
   - Deploy the reports to the GitHub pages.
     




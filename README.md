# Ankit Kathal's Project

This test project runs on a Sauce Demo website with the url [https://www.saucedemo.com/]. This is created for the screening round of Lean technologies using the Playwright automation tool.

## Prerequisites

- npm
- NodeJS (6.10 or higher)

## Clone Project

Follow these steps to clone and navigate to the directory:

1. Clone this repo from GitHub.
2. Open the project in your favourite editor.

## Install Dependencies

Install the dependencies for the project.

The following command installs all the required dependencies to run this example project.

```sh
npm install
```

## Test Configuration

You can configure multiple browsers as you would like in the **`playwright.config.js`**
By default the tests run on all the below 3 browser drivers.

```js
projects: [
  {
    name: "chromium",
    use: {
      ...devices["Desktop Chrome"],
    },
  },

  {
    name: "firefox",
    use: {
      ...devices["Desktop Firefox"],
    },
  },

  {
    name: "webkit",
    use: {
      ...devices["Desktop Safari"],
    },
  },
];
```

> To learn more about test configuration, see [Playwright documentation](https://playwright.dev/docs/test-configuration).

## Run Tests

The **_tests_** directory contains the example test file **`lean.spec.js`** that runs the checkout flow.
The following command runs the test file in the **_tests_** directory.

```sh
npm test
```

## Test Results

The tests generate results in the **test-results** directory.

The **`index.html`** file is an executive summary report aggregating results from all test runs for the different browser drivers.

## Test Run Configuration

```json
  "scripts": {
    "test": "npx playwright test --headed"
  },
```

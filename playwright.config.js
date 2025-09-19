import { defineConfig, devices } from "@playwright/test";
import path from "path";
import 'dotenv/config';
import { getReportFolder } from './utils/reportManager'

// export const STORAGE_STATE = path.join(__dirname, 'storageState', 'storageState.json');
// export const STORAGE_STATE_CHROMIUM = path.join(__dirname, 'storageState', 'storageState_chromium.json');

export const STORAGE_STATE_CHROMIUM = path.join(__dirname, 'storageState', 'storageState_chromium.json');
export const STORAGE_STATE_EDGE = path.join(__dirname, 'storageState', 'storageState_edge.json');
export const STORAGE_STATE_FIREFOX = path.join(__dirname, 'storageState', 'storageState_firefox.json');
export const STORAGE_STATE_WEBKIT = path.join(__dirname, 'storageState', 'storageState_webkit.json');

// const playwrightReportFolder = getReportFolder('playwright-report', 10); 


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  
  timeout: 5 * 60 * 1000, // Global 30 sec timeout for all tests
  expect: {
    timeout: 15 * 1000, // 15 sec Timeout for all expect assertions
  },

  // globalSetup: require.resolve('./tests/login.setup.js'),

  /* Specifies the directory where test files are located */
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ ['list'],
              ['html'],
              ['allure-playwright'],
            ],


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {       
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.STAGE_URL,
    baseURL: 'https://freelance-learn-automation.vercel.app',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Takes screenshots only when a test fails */
    screenshot: 'only-on-failure',

    /* Records video only for failed tests and retains it for debugging */
    video: 'retain-on-failure',

    ignoreHTTPSErrors: true,

    viewport: { width: 1280, height: 720 },

  },

   // /* Configure projects for major browsers */
  projects: [

    /* Chromium browser */
    {
      name: 'smoke-chromium',
      grep: /@smoke/,
      use: {
        browserName: 'chromium',
      },
       testMatch: ['**/homePageTest.spec.js', '**/signupPageTest.spec.js' ],
    },

    {
      name: 'setup-chromium',
      grep: /@setup/,
      dependencies: ['smoke-chromium'],
      use: {
        browserName: 'chromium',
      },
    },

    {
      name: 'chromium',
      use: { 
        // ...devices['Desktop Chrome'], 
        browserName: 'chromium',
        storageState: STORAGE_STATE_CHROMIUM,  
        navigationTimeout: 30000,
        actionTimeout: 30000,         
      },      
      testMatch: '**/*.spec.js',
       testIgnore: ['**/loginSetup.spec.js', '**/homePageTest.spec.js', '**/signupPageTest.spec.js'],
       testIgnore: /@smoke/,
      dependencies: ['smoke-chromium', 'setup-chromium'],
    },



    /* Firefox browser */
    {
      name: 'smoke-firefox',
      testMatch: ['**/homePageTest.spec.js', '**/signupPageTest.spec.js'],
      use: {
        browserName: 'firefox',
      }
    },

    {
      name: 'setup-firefox',
      testMatch: '**/*.setup.js', // Matches files ending with .setup.js for setup tasks     
      dependencies: ['smoke-firefox'],
      use: {
        browserName: 'firefox',
      },
    },

    {
      name: 'firefox',
      use: { 
        // ...devices['Desktop Firefox'],
        browserName: 'firefox',
        storageState: STORAGE_STATE_FIREFOX,
        navigationTimeout: 30000,
        actionTimeout: 30000,
      },
      testMatch: '**/*.spec.js',
      testIgnore: ['**/homePageTest.spec.js', '**/signupPageTest.spec.js'],
      dependencies: ['smoke-firefox', 'setup-firefox'],
    },



    /* Webkit browser */
    {
      name: 'smoke-webkit',
      testMatch: ['**/homePageTest.spec.js', '**/signupPageTest.spec.js' ],
      use: {
        browserName: 'webkit',
      }
    },

    {
      name: 'setup-webkit',
      testMatch: '**/*.setup.js', // Matches files ending with .setup.js for setup tasks     
      dependencies: ['smoke-webkit'],
      use: {
        browserName: 'webkit',
      }
    },
   
    {
      name: 'webkit',
      use: { 
        // ...devices['Desktop Safari'],
        browserName: 'webkit',
        storageState: STORAGE_STATE_WEBKIT, 
        navigationTimeout: 30000,
        actionTimeout: 30000,
       },
      testMatch: '**/*.spec.js',
      testIgnore: ['**/homePageTest.spec.js', '**/signupPageTest.spec.js'],
      dependencies: ['smoke-webkit', 'setup-webkit'],
    },


    ///////////////////////////////////////////////////////////////////////



    // {
    //   name: 'edge',
    //   use: { 
    //     // ...devices['Desktop Edge'], 
    //     browserName: 'chromium',
    //     channel: 'msedge',
    //    },
    // },


    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
       storageState: STORAGE_STATE_CHROMIUM,
      },
      testMatch: '**/*.spec.js', // Matches test files ending with .spec.js
      testIgnore: ['**/homePageTest.spec.js', '**/signupPageTest.spec.js'],
      dependencies: ['setup-chromium'],  // Ensures setup is completed before running these tests
    },
  

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },  
    
  ],
   

 

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


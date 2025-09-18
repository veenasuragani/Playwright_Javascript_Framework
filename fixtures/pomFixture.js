import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { ManageCategoryPage } from '../pages/manageCategoryPage';
import { ManageCoursePage } from '../pages/manageCoursePage';
import { SignupPage } from '../pages/signupPage';
import { WelcomePage } from '../pages/welcomePage';

/** 
 * @typedef {import('../pages/homePage').HomePage} HomePage
 * @typedef {import('../pages/loginPage').HomePage} LoginPage 
 * @typedef {import('../pages/welcomePage').HomePage} WelcomePage
 * */

const test = base.extend({

    /**
     * @param {import('@playwright/test').Page} page
     * @param {(homePage: HomePage) => Promise<void>} use
     * @param {(loginPage: LoginPage) => Promise<void>} use
     * @param {(welcomePage: WelcomePage) => Promise<void>} use
     */

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    categoryPage: async ({ page }, use) => {
        await use(new ManageCategoryPage(page));
    },

    manageCoursePage: async ({ page }, use) => {
        await use(new ManageCoursePage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    welcomePage: async ({ page }, use) => {
        await use(new WelcomePage(page));
    }
})

export { test, expect };
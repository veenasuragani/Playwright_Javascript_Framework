import { BasePage } from "./basePage";
import { ManageCoursePage } from "./manageCoursePage";

import selector from '../locators/homePage.json';
import { ManageCategoryPage } from "./manageCategoryPage";
// const selector = require('../pageObjects/homePage.json');


export class WelcomePage extends BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    
    constructor(page) {
        super(page);
    }

    async openWelcomePage() {
        await this.page.goto("/");
       
    }

    async hoverOnManageMenu() {
        await this.hoverOnElement(`${selector.manageMenu}`);
    }

    async clickOnManageCourseLink() {
        await this.clickOnElement(`${selector.manageCourse}`);
        return new ManageCoursePage(this.page)
    }

    async clickOnManageCategoryLink() {
        const newWindow = await this.handleNewWindow(`${selector.manageCategory}`);     
        await this.wait();
        return new ManageCategoryPage(newWindow);
    }

    async clickOnHamburgermenu() {
        await this.clickOnElement(selector.hamburgerMenu);
    }

    async clickOnSignoutLink() {
        await this.clickOnElement(selector.signOut);
        await this.wait();
    }

    async storeSession(storagePath) {
        await this.page.context().storageState(storagePath);
    }


    
}
import { BasePage } from "./basePage";
import selector from '../locators/manageCategoryPage.json';



export class ManageCategoryPage extends BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page ;
     */

    constructor(page) {
        super(page);
    }

    async navigateMnaageCategoryPage() {
        await this.page.goto("/category/manage");
    }
    
    async clickOnAddCategoryButton() {
        await this.clickOnElement(`${selector.addNewCategoryButton}`);
    }

    async getCategoryNameFromList(categoryName) {
        const table = await this.getElement(`${selector.table}`);
        const rows = await table.locator(`${selector.rows}`);
        const rowData = await rows.filter({
            has: this.page.locator('td'),
            hasText: `${categoryName}`
        })
        const createdCategoryName = await rowData.locator("//td[1]").textContent();
        console.log("Category name: ", createdCategoryName);
        return createdCategoryName;
    }

    async clickOnUpdateButton(categoryName) {
        await this.page.getByRole('row', {name: `${categoryName}`}).getByRole('button', {name: 'Update'}).click();
        
        // Runs the time for 6 seconds.
        await this.page.clock.runFor(6000);
    }

    async deleteCategory(categoryName) {
        await this.page.getByRole('row', {name: `${categoryName}`}).getByRole('button', {name: 'Delete'}).click();
        await this.wait();
    }


    async getPopupMessage() {
        const popup = await this.getElement(`${selector.popupWindow}`);
        const popupMessage = await popup.locator(`${selector.popupMessage}`).textContent();
        return popupMessage;
    }

    async clickOnDeleteOnPopup() {
        const popup = await this.getElement(`${selector.popupWindow}`);
        await popup.locator(`${selector.deleteButton}`).click();
        await this.wait();
    }

 }
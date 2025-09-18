import { BasePage } from "./basePage";
import selector from '../locators/manageCoursePage.json';


export class ManageCoursePage extends BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */

    constructor(page) {
        super(page);
    }

    async navigateCourseManagePage() {
        await this.page.goto('/course/manage');

    }

    async clickOnAddNewCourseButton() {
        await this.clickOnElement(`${selector.addCourse}`);
    }

    async clickOnChooseFile() {
        await this.clickOnElement(`${selector.chooseFile}`);
    }

    async uploadImageFile(filePath) { 
        const element = await this.getElement(`${selector.chooseFile}`);
        await element.setInputFiles(filePath);    
    }

    async enterCoursename(courseName) {
        await this.fillText(`${selector.courseName}`, courseName);
    }

    async enterDescription(description) {
        await this.fillText(`${selector.description}`, description);
    }

    async enterInstructor(instructorName) {
        await this.fillText(`${selector.instructor}`, instructorName);
    }

    async enterPrice(priceValue) {
        await this.fillText(`${selector.price}`, priceValue);
    }

    async clickOnStartDate() {
        await this.clickOnElement(`${selector.startDate}`);
    }

    async clickOnEndDate() {
        await this.clickOnElement(`${selector.endDate}`);
    }

    async datePicker(expectedMonth, expectedDay) {
        while(true) {
            const actualMonthYear = await this.getElementText(`${selector.currentMonth}`);
            const [actualMonth, actualYear] = actualMonthYear.split(' ');
        
            const actualMonthObject = await this.getMonthObject(actualMonth);
            const expectedMonthObject = await this.getMonthObject(expectedMonth);

            if(actualMonthObject < expectedMonthObject){
                await this.clickOnElement(`${selector.nextMonth}`);

            } else if(actualMonthObject > expectedMonthObject) {
                await this.clickOnElement(`${selector.previousMonth}`);
                            
            } else {
                break;
            }
        }  
        
        const days = await this.getElement(`${selector.days}`);
        await days.filter({
            hasText: expectedDay
        }).click();
    }   
    
    
    async getPermanentCheckboxStatus() {
        const status = await this.checkboxStatus(`${selector.permanentCheckbox}`);
        return status;
    }

    async clickOnSaveButton(locator) {
        await this.clickOnElement(`${selector.saveButton}`);
        await this.wait();
    }


    async checkboxStatus() {
        const checkbox = await this.getElement(`${selector.permanentCheckbox}`);
        return checkbox;
    }

    async selectCategory() {
        await this.clickOnElement(`${selector.selectCategory}`);
        const categories = await this.getAllElements(`${selector.categories}`);
        const randomIndex = Math.floor(Math.random() * categories.length);
        await this.wait();
        await categories[randomIndex].click();
    }


    async rowsCount() {
        const table = await this.getElement(`${selector.table}`);
        const rows = await table.locator(`${selector.rows}`);
        return rows.count();
    }


    async getCourseNameFromList(courseName) {
        const table = await this.getElement(`${selector.table}`);
        const rows = await table.locator(`${selector.rows}`);
        const rowData = await rows.filter({
            has: this.page.locator('td'),
            hasText: `${courseName}`
        })
        const createdCourseName = await rowData.locator("//td[2]").textContent();
        return createdCourseName;
    }

    async getCreatedCourseElement(courseName) {
        const table = await this.getElement(`${selector.table}`);
        const rows = await table.locator(`${selector.rows}`);
        const rowData = await rows.filter({
            has: this.page.locator('td'),
            hasText: `${courseName}`
        })
        const rowElement = await rowData.locator("//td[2]")
        return rowElement;

    }


    async deleteCourse(courseName) {
        await this.page.getByRole('row', {name: `${courseName}`}).getByRole('button', {name: 'Delete'}).click();
        // const table = await this.getElement(`${selector.webTable.table}`);
        // const rows = await table.locator(`${selector.webTable.rows}`);
        // const rowData = await rows.filter({
        //     has: this.page.locator('td'),
        //     hasText: `${courseName}`
        // })
        // await rowData.locator("//button[contains(text(), 'Delete')]").click();
        await this.wait();        
    }


    async deleteCourceByAi() {
        await ai()
    }


}
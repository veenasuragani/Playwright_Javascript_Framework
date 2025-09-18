import { resolve } from 'path';
import { promiseHooks } from 'v8';

export class BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */

    constructor(page) {
        this.page = page;
    }

    /* Wait for timeout */
    async wait(){
        await this.page.waitForTimeout(3000);
    }

    /* get the element */
    async getElement(locator) {
        const element = await this.page.locator(locator)
        return element;
    }

    /* get all elements */
    async getAllElements(locator) {
        const elements = await this.page.locator(locator).all();
        // const elements = await this.page.$$(locator);
        return elements;
    }

    /* Click on the element */
    async clickOnElement(locator) {
        await this.page.locator(locator).click();
    }

    /* Mouse hover on the element */
    async hoverOnElement(locator) {
        await this.page.locator(locator).hover();
    }

    /* Enter the text into the text field */
    async fillText(locator, text) {
        await this.page.locator(locator).fill(text);
    }

    /* Return the page title */
    async getPageTitle() {
        const title =  await this.page.title();        
        return title;
    }

    /* Get page URL */
    async getCurrentURL() {
        const currentUrl = await this.page.url();
        return currentUrl;
    }

    /* Returns the text content */
    async getElementText(locator) {
        const text = await this.page.locator(locator).textContent();
        return text;
    }

    /* Upload the file */
    async fileUpload(locator, filePath) {
        await this.page.locator(locator).setInputFiles(filePath);
        await this.wait();
    }

    /* Return checkbox status in boolean value whether checkbox is checked or not */
    async checkboxStatus(locator) {
        const checkboxStatus = await this.page.locator(locator).isChecked();
        return checkboxStatus;
    }

    /* Select the option from dropdown */
    async selectFromDropdownByvisibleText(locator, option) {
        await this.page.locator(locator).selectOption(option);
    }

    /* Select multiple options from dropdown */
    async selectMultipleOptions(locator, opetion1, option2) {
        await this.page.selectOption(locator, {value: [opetion1, option2]});
    }


    /* Create a promise to capture the alert message and accept the alert */
    async getAlertMessage() {
        return new Promise((resolve) => {
            this.page.on('dialog', async dialog => {
                resolve(dialog.message());
                await dialog.accept();
            })
        })
    }

    /* Accept the alert by giving the input prompt */
    async acceptAlertWithInputPrompt(categoryname) {
        this.page.on('dialog', async dialog => {
            await dialog.accept(categoryname);
        })
    }

     
    /* Hadle a new window by clicking on a element */
    async handleNewWindow(locator) {
        // Listen for the new page (tab) event
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Wait for the new tab to open
            this.clickOnElement(locator)        // Click on the element that opens the new tab
        ]);

        // Return the new tab (page object)
        return newPage;
    }

    async getRandomNumber(num) {
        const number = Math.floor(Math.random * num)
        return number;
    }


    async getMonthObject(month) {
        const monthsObj = {
            JANUARY : 1,
            FEBRUARY : 2,
            MARCH : 3,
            APRIL : 4,
            MAY : 5,
            JUNE : 6,
            JULY : 7,
            AUGUST : 8,
            SEPTEMBER : 9,
            OCTOBER : 10,
            NOVEMBER : 11,
            DECEMBER : 12
        }  
    
        const monthObj = monthsObj[month.toUpperCase()];
        return monthObj;    
    }


    async getAllAltTextFromPage(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');

        const imageInfo = await this.page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.map(img => ({
                alt : img.getAttribute('alt') || 'No alt attribute',
                src : img.getAttribute('src') || 'No src attribute'
            }))
        })
    }


    async getAllUrlsFromSitemapXml(sitemapXmlUrl) {
        
    }


    
    

}
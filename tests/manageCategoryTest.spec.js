import {test, expect } from "../fixtures/pomFixture";
import { faker } from '@faker-js/faker';

// import { test, expect } from '@playwright/test';
// import { WelcomePage } from '../pages/welcomePage';
// import { ManageCategoryPage } from '../pages/manageCategoryPage';


const category_name = `Playwright ${faker.lorem.word()}`;
const new_category_name = `Playwright ${faker.lorem.word()}`;


test.describe('Mange course category flow', () => {  

    test.describe.configure({ mode: 'serial'});

    // test.beforeEach(async ({ page }) => { 
    //     category_name = `Playwright ${faker.lorem.word()}`;
    // })
    
    test('Verify new window', async ({ welcomePage }) => {
        // const welcomePage = new WelcomePage(page); 

        await welcomePage.openWelcomePage();
        await welcomePage.hoverOnManageMenu();
        const manageCategoryPage = await welcomePage.clickOnManageCategoryLink();

        const title = await manageCategoryPage.getPageTitle();
        console.log('New window title: ', title);
        expect(title).toBe('Learn Automation Courses');       
    })


    test('Create a new category', async ({ categoryPage }) => {
        // const categoryPage = new ManageCategoryPage(page);

        await categoryPage.navigateMnaageCategoryPage();

        await categoryPage.acceptAlertWithInputPrompt(category_name);
        await categoryPage.clickOnAddCategoryButton();
        await categoryPage.wait();

        const categoryname = await categoryPage.getCategoryNameFromList(category_name);
        expect(categoryname).toBe(category_name); 
    })

    test('Update category name', async ({ categoryPage }) => {
        // const categoryPage = new ManageCategoryPage(page);

        await categoryPage.navigateMnaageCategoryPage();

        await categoryPage.acceptAlertWithInputPrompt(new_category_name);
        await categoryPage.clickOnUpdateButton(category_name);
        await categoryPage.wait();

        const categoryname = await categoryPage.getCategoryNameFromList(new_category_name);
        expect(categoryname).toBe(new_category_name); 
    })


    test('Delete the category', async ({ categoryPage }) => {
        // const categoryPage = new ManageCategoryPage(page);

        await categoryPage.navigateMnaageCategoryPage();
        await categoryPage.deleteCategory(new_category_name);
        const popupMessage = await categoryPage.getPopupMessage();
        await categoryPage.clickOnDeleteOnPopup();

        const message = await popupMessage;
        console.log('Actual alert message: ', message);
        expect(message).toBe('Are you sure that you want to delete this category?');   
    })      
})
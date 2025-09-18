import { test, expect } from "../fixtures/pomFixture";


test.describe('@smoke Home page test', () => {

    test.describe.configure({mode: 'serial'});

    test('Open application and verify the page title', async ({ homePage }) => {
        // const homePage = new HomePage(page);
        await homePage.openApplication();
        const title = await homePage.getPageTitle();
        console.log("Home page title: ", title);
        expect(title).toBe("Learn Automation Courses");
    })


    test('Verify courses should be more than one', async ({ homePage }) => {
        // const homePage = new HomePage(page);
        await homePage.openApplication();
        await homePage.wait();
        
        const courseCount = await homePage.getCoursesCount();
        expect(courseCount).toBeGreaterThan(1);
    })

    test('Verify new user link is clickable.', async ({ homePage }) => {
        // const homePage = new HomePage(page);
        await homePage.openApplication();
        await homePage.clickOnHamburgerMenu();
        const loginPage = await homePage.clickOnLoginLink();

        const newUserLink = await loginPage.getNewUserLink();
        expect(newUserLink).toBeEnabled();
    })

})
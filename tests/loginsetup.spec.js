import { test, expect } from "../fixtures/pomFixture";
import 'dotenv/config';
import path from "path";


test('@setup Perform login action', async ({ loginPage, browserName }) => {
    const STORAGE_STATE = path.join(__dirname, '..', 'storageState', `storageState_${browserName}.json`);
    console.log("Storage name: ", STORAGE_STATE);

    await loginPage.navigateToLoginPage();
    // await loginPage.enterEmail(process.env.LOGIN_EMAIL);
    // await loginPage.enterPassword(process.env.LOGIN_PASSWORD);
    await loginPage.enterEmail("raja@gmail.com");
    await loginPage.enterPassword("password")
    const welcomePage = await loginPage.clickOnSigninButton();
    const title = await welcomePage.getPageTitle();
    await welcomePage.wait(2000);
    expect(title).toBe("Learn Automation Courses");
    await welcomePage.storeSession({path: STORAGE_STATE});
    // await welcomePage.storeSession({path : ".auth/loginPage.json"});
})



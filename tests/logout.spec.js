import { test, expect } from "../fixtures/pomFixture";


test('Perform logout action', async ({ welcomePage }) => {
    await welcomePage.openWelcomePage();
    await welcomePage.clickOnHamburgermenu();
    await welcomePage.clickOnSignoutLink();
    const url = await welcomePage.getCurrentURL();
    expect(url).toBe("https://freelance-learn-automation.vercel.app/login");   
})

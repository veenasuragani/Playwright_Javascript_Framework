import { BasePage } from './basePage';
import { WelcomePage } from './welcomePage';
import { SignupPage } from './signupPage';
import selector from '../locators/loginPage.json';



export class LoginPage extends BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */

    constructor(page) {
        super(page);
        this.emailField = "[name='email1']";
        this.passwordField = "[name='password1']";
        this.signinButton = "[type='submit']";
    }

    async navigateToLoginPage() {
        await this.page.goto('/login');
        await this.page.waitForTimeout(3000);
    }

    async enterEmail(email) {
        await this.page.waitForSelector(this.emailField);
        await this.fillText(this.emailField, email);
    }

    async enterPassword(password) {
        await this.fillText(this.passwordField, password);
    }

    async clickOnSigninButton() {
        await this.clickOnElement(this.signinButton);
        return new WelcomePage(this.page);
    }

    async getNewUserLink() {
        const newUserLink = await this.getElement(`${selector.newUserLink}`);
        return newUserLink;
    }

    async clickOnNewUserLink() {
        await this.clickOnElement(`${selector.newUserLink}`);
        return new SignupPage(this.page);
    }


    async getSignupSuccessMessage() {
        const message = await this.getElementText(`${selector.successMessage}`);
        return message;
    }
}
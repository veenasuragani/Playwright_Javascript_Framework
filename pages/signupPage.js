import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";

import selector from '../locators/signupPage.json';


export class SignupPage extends BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page ;
     */

    constructor(page) {
        super(page);
    }

    async navigateToSignupPage() {
        await this.page.goto("/signup")
    }

    async enterName(name) {
        await this.fillText(`${selector.nameField}`, name);
    }

    async enterEmail(email) {
        await this.fillText(`${selector.emailField}`, email);
    }

    async enterPassword(password) {
        await this.fillText(`${selector.passwordfield}`, password);
    }

    async checkInterestsCheckbox(interests) {
        const checkboxes = await this.getElement(`${selector.interestChecboxes}`);
        const expectedCheckbox = checkboxes.filter({
            hasText: interests
        })
        await expectedCheckbox.click();
    }

    async selectGenderRadioButton(gender) {
        if(gender.toLowerCase() === 'male') {
            await this.clickOnElement(`${selector.maleGenderRadioButton}`);
        } else {
            await this.clickOnElement(`${selector.femaleGenderRadioButton}`);
        }        
    }

    async selectState(state) {
        await this.selectFromDropdownByvisibleText(`${selector.selectState}`, state);
    }


    async selectHobbies() {
        let randomIndexes = [];
        const hobbies = await this.getAllElements(`${selector.hobbies}`);
        
        // Generate two unique random indexes
        while (randomIndexes.length < 2) {
            let randomIndex = Math.floor(Math.random() * hobbies.length);
            if (!randomIndexes.includes(randomIndex) && randomIndex !== 0) {
                randomIndexes.push(randomIndex);
            }
        }
    
        // Select hobbies based on the random indexes
        for (let index of randomIndexes) {
            await hobbies[index].click(); // Assuming you want to click the hobby element
        }
    }

    async clickOnSignupButton() {
        await this.clickOnElement(`${selector.signupButton}`);
        return new LoginPage(this.page);
    }
       
}
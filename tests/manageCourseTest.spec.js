import { test, expect } from "../fixtures/pomFixture";
import { faker } from "@faker-js/faker";

const course_name = `Playwright ${faker.lorem.word()} course`;

test.describe('Course creation test flow', () => {

    test.describe.configure({ mode: 'serial' });


    test('Add a new course and verify it', async ({ welcomePage }) => {
        // const welcomePage = new WelcomePage(page);
        await welcomePage.openWelcomePage();
        await welcomePage.hoverOnManageMenu();
        const manageCoursePage = await welcomePage.clickOnManageCourseLink();

        await manageCoursePage.clickOnAddNewCourseButton();
        await manageCoursePage.uploadImageFile('testData/images/smallerImage.jpg');
        await manageCoursePage.enterCoursename(course_name);
        await manageCoursePage.enterDescription(`Playwright ${faker.lorem.sentence()}`);
        await manageCoursePage.enterInstructor(`${faker.person.firstName()}`);
        await manageCoursePage.enterPrice('8999');
        await manageCoursePage.clickOnStartDate();
        await manageCoursePage.datePicker('November', '25');
        await manageCoursePage.clickOnEndDate();
        await manageCoursePage.datePicker('December', '10');

        const checkbox = await manageCoursePage.checkboxStatus();
        await expect(checkbox).not.toBeChecked();

        await manageCoursePage.selectCategory();
        await manageCoursePage.clickOnSaveButton();

        const courseName = await manageCoursePage.getCourseNameFromList(course_name);
        console.log("Course Name: ", courseName);
        expect(courseName).toBe(course_name);         
    })

    
    test('Delete the course', async ({ manageCoursePage }) => {
        // const manageCoursePage = new ManageCoursePage(page);

        await manageCoursePage.navigateCourseManagePage();
        await manageCoursePage.deleteCourse(course_name);
        await manageCoursePage.wait();

        const deletedCourseElement = await manageCoursePage.getCreatedCourseElement(course_name);        
        await expect(deletedCourseElement).not.toBeAttached();
    })


    test('Verify the alert for uploading larger file', async ({ manageCoursePage }) => {
        // const manageCoursePage = new ManageCoursePage(page);

        await manageCoursePage.navigateCourseManagePage();
        await manageCoursePage.clickOnAddNewCourseButton();

        const alertMessage = manageCoursePage.getAlertMessage();
        await manageCoursePage.uploadImageFile('testData/images/largerImage.jpg');
        const message = await alertMessage;
        console.log('Actual alert message: ', message);
        expect(message).toBe('File size should be less than 1MB');
        
    })

})
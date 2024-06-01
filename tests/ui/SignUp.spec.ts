import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker/locale/en";


import {HomePage} from "../../pages/HomePage";
import {RegistrationPage} from "../../pages/RegistrationPage";

// @ts-ignore
import { Person } from '../../pages/Dataclasses/person';



test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.openUrl()
});

test.afterEach(async ({ page }) => {

    await page.close();
});

test('Registration Test', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    const personData = new Person(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.phone.number(), "test123", "test123");

    await registrationPage.gotoRegisterPage()
    await registrationPage.registerPerson(personData)
    await registrationPage.clickConfirmTerms()
    await registrationPage.clickContinue()
    await registrationPage.confirmRegistration()


});

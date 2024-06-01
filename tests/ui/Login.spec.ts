import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Modals/LoginPage';
import {HomePage} from "../../pages/HomePage";
import {Person} from "../../pages/Dataclasses/person";


test.describe.parallel("Login with User Tests", () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.openUrl()
    });

    test.afterEach(async ({ page }) => {

        await page.close();
    });

    test('Login Test', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        const loginData = new Person("", "", "testonee@test.com", "", "test123", "");


        await loginPage.gotoLoginPage()
        await loginPage.fillLoginForm(loginData)
        await loginPage.clickLoginButton()
        await loginPage.confirmLogin()



    });

});

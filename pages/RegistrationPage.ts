import {expect, Locator, Page} from '@playwright/test';

// @ts-ignore
import { Person } from '../pages/Dataclasses/person';
import {NavBar} from "./PageFragments/NavBar";

// @ts-ignore
export class RegistrationPage extends NavBar{
    protected page: Page;
    protected myAccountSelector: Locator;
    protected dashboard: Locator;
    protected myOrder: Locator;
    protected return: Locator;
    protected tracking: Locator;
    protected myVoucher: Locator;
    protected logout: Locator;
    protected rightNavLogout: Locator;
    protected editAccount: Locator;



    constructor(page: Page) {
        super(page);
        this.page = page;
        this.myAccountSelector = page.getByRole('button', { name: ' My account' })
        this.dashboard = page.getByRole('link', { name: 'Dashboard' })
        this.myOrder = page.getByRole('link', { name: 'My order' })
        this.return = page.getByRole('link', { name: 'Return', exact: true })
        this.tracking = page.getByRole('link', { name: 'Tracking', exact: true })
        this.myVoucher = page.getByRole('link', { name: 'My voucher' })
        this.logout = page.getByRole('link', { name: 'Logout', exact: true })
        this.rightNavLogout = page.locator("//a[contains(text(),'Logout')]")
        this.editAccount = page.locator("//a[normalize-space()='Edit Account']")
    }

    // Define selectors for elements on the login page


    async confirmRegistration() {
        await this.myAccountSelector.hover();
        await expect(this.dashboard).toBeVisible();
        await expect(this.myOrder).toBeVisible();
        await expect(this.return).toBeVisible();
        await expect(this.tracking).toBeVisible();
        await expect(this.myVoucher).toBeVisible();
        await expect(this.logout).toBeVisible();

        await expect(this.page.locator('h1')).toContainText('Your Account Has Been Created!');
        await expect(this.rightNavLogout).toContainText('Logout');
        await expect(this.editAccount).toContainText('Edit Account');

    }


    async enterFirstName(firstName:string) {
        await this.page.getByPlaceholder('First Name').fill(firstName);
    }

    async enterLastName(lastName:string) {
        await this.page.getByPlaceholder('Last Name').fill(lastName);
    }

    async enterEmail(email:string) {
        await this.page.getByPlaceholder('E-Mail').fill(email);
    }

    async enterTelephone(telephone:string) {
        await this.page.getByPlaceholder('Telephone').fill(telephone);
    }

    async enterPassword(password:string) {
        await this.page.getByPlaceholder('Password', { exact: true }).fill(password);
    }

    async enterConfirmPassword(confirmPassword:string) {
        await this.page.getByPlaceholder('Password Confirm').fill(confirmPassword);
    }

    async clickConfirmTerms() {
        await this.page.getByText('I have read and agree to the').click();
    }

    async clickContinue() {
        await expect(this.page.getByRole('button', { name: 'Continue' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }



    async registerPerson(person: Person) {
        // Fill in the person data
        if (person.firstName) {
            await this.enterFirstName(person.firstName)
        }
        if (person.lastName) {
            await this.enterLastName(person.lastName)
        }
        if (person.email) {
            await this.enterEmail(person.email);
        }
        if (person.telephone) {
            await this.enterTelephone(person.telephone);
        }
        if (person.password) {
            await this.enterPassword(person.password);
        }
        if (person.confirmPassword) {
            await this.enterConfirmPassword(person.confirmPassword)
        }

    }




}

import {expect, Locator, Page} from '@playwright/test';
import {NavBar} from "../PageFragments/NavBar";
import {Person} from "../Dataclasses/person";

export class LoginPage extends NavBar {
    // Define selectors for elements on the login page
    private LoginLink: Locator;
    private ReturningCustomerLink: Locator;
    private EMailAddressBox: Locator;
    private PasswordBox: Locator;
    private LoginButton: Locator;
    private ForgottenPasswordLink: Locator;
    private MyAccountHeading: Locator;
    private MyOrdersHeading: Locator;
    private PasswordLink: Locator;
    private LogoutLink: Locator;


    constructor(page: Page) {
        super(page); // Call the constructor of the parent class
        this.LoginLink = page.getByRole('link', { name: 'Login' })
        this.ReturningCustomerLink = page.getByRole('heading', { name: 'Returning Customer' })
        this.EMailAddressBox = page.getByPlaceholder('E-Mail Address')
        this.PasswordBox = page.getByPlaceholder('Password')
        this.LoginButton = page.getByRole('button', { name: 'Login' })
        this.ForgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password', exact: true })
        this.MyAccountHeading = page.getByRole('heading', { name: 'My Account' })
        this.MyOrdersHeading = page.getByRole('heading', { name: 'My Orders' })
        this.PasswordLink = page.locator("//a[normalize-space()='Password']")
        this.LogoutLink = page.locator("//a[contains(text(),'Logout')]")


    }


    async enterUserName(username: string) {
        await this.EMailAddressBox.fill(username);
    }

    async enterPassword(password: string) {
        await this.PasswordBox.fill(password);

    }

    async clickForgottenPasswordLink() {
        await this.ForgottenPasswordLink.click()
    }

    async clickLoginButton() {
        await expect(this.LoginButton).toBeVisible();
        await this.LoginButton.click()

    }

    async fillLoginForm(login:Person) {

        // await expect(this.ReturningCustomerLink).toBeVisible();

        // Fill in the person data
        if (login.email) {
            await this.enterUserName(login.email)
        }
        if (login.password) {
            await this.enterPassword(login.password)
        }
    }


    async confirmLogin() {
        await expect(this.PasswordLink).toBeVisible();
        await expect(this.LogoutLink).toBeVisible();
    }
}

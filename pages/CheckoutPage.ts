import {expect, Locator, Page} from "@playwright/test";

import {EditCartPage} from "./EditCartPage";
import {Address} from "./Dataclasses/address";


export class CheckoutPage extends EditCartPage {
    private Telephone: Locator;
    private FirstName: Locator;
    private LastName: Locator;
    private Company: Locator;
    private AddressLine1: Locator;
    private AddressLine2: Locator;
    private City: Locator;
    private PostCode: Locator;
    private CountryDropdown: Locator;
    private RegionDropdown: Locator;
    private TermsAndConditions: Locator;
    private UseNewAddress: Locator;
    private UseExistingAddress: Locator;
    private CountinueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.Telephone = page.getByPlaceholder('Telephone')
        this.FirstName = page.getByPlaceholder('First Name')
        this.LastName = page.getByPlaceholder('Last Name')
        this.Company = page.getByPlaceholder('Company')
        this.AddressLine1 = page.getByPlaceholder('Address 1')
        this.AddressLine2 = page.getByPlaceholder('Address 2')
        this.City = page.getByPlaceholder('City')
        this.PostCode = page.getByPlaceholder('Post Code')
        this.CountryDropdown = page.getByLabel('Country')
        this.RegionDropdown = page.getByLabel('Region / State')
        this.TermsAndConditions = page.getByLabel('breadcrumb').getByText('Checkout')
        this.UseNewAddress = page.locator("[for='input-payment-address-new']")
        this.UseExistingAddress = page.locator("[for='input-payment-address-existing']")
        this.CountinueButton = page.getByRole('button', { name: 'Continue ' })

    }

    async enterFirstName(firstName: string) {
        await this.FirstName.fill(firstName)
    }

    async enterLastName(lastName: string) {
        await this.LastName.fill(lastName)
    }

    async enterCompany(company: string) {
        await this.Company.fill(company)
    }

    async enterAddressLine1(line1: string) {
        await this.AddressLine1.fill(line1)
    }

    async enterAddressLine2(line2: string) {
        await this.AddressLine2.fill(line2)
    }

    async enterCity(city: string) {
        await this.City.fill(city)
    }

    async enterPostCode(postcode: string) {
        await this.PostCode.fill(postcode)
    }

    async selectCountry(country: string) {
        await this.CountryDropdown.selectOption(country)

    }

    async selectRegion(region: string) {
        await this.RegionDropdown.selectOption(region)

    }

    async useNewAddress() {
        await this.UseNewAddress.click()
    }

    async useExistingAddress() {
        await this.UseExistingAddress.click()
    }

    async termsAndConditions() {
        await this.TermsAndConditions.click()
    }

    async continue() {
        await this.CountinueButton.click()
    }

    async  fillCheckoutForm(address: Address) {
        await this.enterFirstName(address.firstName);
        await this.enterLastName(address.lastName);
        await this.enterCompany(address.company);
        await this.enterAddressLine1(address.addressLine1);
        await this.enterAddressLine2(address.addressLine2);
        await this.enterCity(address.city);
        await this.enterPostCode(address.postCode);
        await this.selectCountry(address.country);
        await this.selectRegion(address.region);
    }


}
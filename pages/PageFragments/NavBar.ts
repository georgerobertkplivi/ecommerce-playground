import {expect, Locator, Page} from '@playwright/test';
import endpoint from "../../configTypes"
import {Categories} from "../Dataclasses/Categories";

export class NavBar {
    protected page: Page;
    homeLink: Locator;
    shopByCategoryLink: Locator;
    closeCategoryLink: Locator;
    specialHotLink: Locator;
    blogLink: Locator;
    megaMenuLink: Locator;
    AddOnsFeaturedLink: Locator;
    myAccountSelector: Locator;
    searchBarSelector: Locator;
    searchButtonSelector: Locator;
    cartTotalSelector: Locator;
    cartSelector: Locator;
    addToCartPopUpClose: Locator;
    totalLabel: Locator;
    allCategories: Locator;
    laptopsCategory: Locator;



    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home' })
        this.shopByCategoryLink = page.getByRole('button', { name: 'Shop by Category' })
        this.closeCategoryLink = page.getByRole('heading', { name: 'Top categories close' }).getByLabel('close')
        this.specialHotLink = page.getByRole('link', { name: 'Special Hot', exact: true })
        this.blogLink = page.getByRole('link', { name: 'Blog', exact: true })
        this.megaMenuLink = page.getByRole('button', { name: 'Mega Menu' })
        this.AddOnsFeaturedLink = page.getByRole('button', { name: 'AddOns Featured' })
        this.myAccountSelector = page.getByRole('button', { name: ' My account' })
        this.searchBarSelector = page.getByRole('textbox', { name: 'Search For Products' })
        this.searchButtonSelector = page.getByRole('button', { name: 'Search' })
        this.cartTotalSelector = page.locator("(//span[@class='badge badge-pill badge-info cart-item-total'])[1]")
        this.cartSelector = page.getByRole('button', { name: 'Add to Cart' })
        this.addToCartPopUpClose = page.getByRole('button', { name: 'Close' })
        this.totalLabel = page.getByRole('cell', { name: 'Total:', exact: true })
        this.allCategories = page.getByRole('button', { name: 'All Categories' })
        this.laptopsCategory = page.getByRole('link', { name: 'Laptops', exact: true })

    }

    async homePageLoads() {
        expect(this.page.url()).toContain("ecommerce-playground")
        await expect(this.homeLink).toBeVisible();
        await expect(this.shopByCategoryLink).toBeVisible();
        await expect(this.specialHotLink).toBeVisible();

    }

    async gotoRegisterPage() {
        await this.myAccountSelector.hover();
        await this.page.getByRole('link', { name: 'Register' }).click();
        await expect(this.page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
    }

    async searchProduct(productName: string) {
        await this.searchBarSelector.fill(productName);
        await this.searchButtonSelector.click();
    }

    async searchProductByCategory(category: Categories) {
        await this.allCategories.click();

        // Construct the XPath expression using the enum value
        const xpathExpression = `//div[@class='dropdown-menu dropdown-menu-left show']//a[@class='dropdown-item'][normalize-space()='${category}']`;

        // Click on the element corresponding to the category
        await this.page.locator(xpathExpression).click();

        // Click on the search button
        await this.searchButtonSelector.click();
    }

    async noSearchResults(productName: string) {
        await expect(this.page.locator('h1')).toContainText("Search -  " + productName + "");
        await expect(this.page.locator('#entry_212469')).toContainText('There is no product that matches the search criteria.');
    }



    async gotoLoginPage() {
        await this.myAccountSelector.hover();
        await this.page.getByRole('link', { name: 'Login', exact: true }).click();
        // await expect(this.page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
    }



    async gotoHome() {
        await this.homeLink.click()
    }

    async gotoSpecialHot() {
        await this.specialHotLink.click()
    }

    async gotoBlog() {
        await this.blogLink.click()
    }

    async gotoMegaMenu() {
        await this.megaMenuLink.click()
    }

    async gotoAdOns() {
        await this.AddOnsFeaturedLink.click()
    }

    async gotoMyAccount() {
        await this.myAccountSelector.click()
    }

    async getCartTotal() {
        return await this.cartTotalSelector.innerText()
    }


    async openCart() {
        await this.cartSelector.click()
        await expect(this.totalLabel).toBeVisible();
        await this.page.waitForTimeout(5000)
    }

    async closeAddToCartPopUpMessage() {
        await this.addToCartPopUpClose.click()
    }




}

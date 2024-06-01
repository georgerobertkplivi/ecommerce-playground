import {expect, Locator, Page} from "@playwright/test";
import {NavBar} from "./PageFragments/NavBar";
import {SearchResultsPage} from "./SearchResultsPage";

export class ProductDetailsPage extends SearchResultsPage{
    priceLabel: Locator;
    InStock: Locator;
    ProductName: Locator;
    BuyNowButton: Locator;
    brandLabel: Locator;
    private Checkout: Locator;
    private EditCart: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.brandLabel = page.locator("ul[class='list-unstyled m-0'] li a")
        this.priceLabel = page.locator(".price-new.mb-0")
        this.InStock = page.locator("//span[.='In Stock']")
        this.ProductName = page.locator(".breadcrumb-item.active")
        this.BuyNowButton = page.locator("button[title='Buy now']")
        this.Checkout = page.getByRole('link', { name: 'Checkout' })
        this.EditCart = page.getByRole('link', { name: 'View Cart ' })
    }

    async clickAddToCartButton(){
        await this.page.getByRole('link', { name: 'Add to cart' }).click()
    }

    async getItemPrice(){
        return await this.priceLabel.innerText()
    }

    async getProductName(){
        return await this.ProductName.innerText()
    }

    async getProductBrand(){
        return await this.brandLabel.innerText()
    }

    async getProductAvailability(){
        return await this.InStock.innerText()
    }

    async gotoCheckoutPage(){
        await this.Checkout.click()
    }

    async viewCart(){
        await this.EditCart.click()
    }




}
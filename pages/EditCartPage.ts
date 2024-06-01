import {CartModal} from "./Modals/CartModal";
import {expect, Locator, Page} from "@playwright/test";

export class EditCartPage extends CartModal{
    private checkoutButton: Locator;
    private itemQuantity: Locator;
    private removeButton: Locator;
    private emptyCartMsg1: Locator;
    private emptyCartMsg2: Locator;
    unitPriceLabel: Locator;
    private totalPriceLabel: Locator;
    private quantityLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' })
        this.removeButton = page.getByRole('button', { name: '' })
        // this.removeButton = page.locator("button[data-original-title='Remove']")
        this.emptyCartMsg1 = page.getByRole('heading', { name: 'Shopping Cart' })
        this.emptyCartMsg2 = page.locator('#content').getByText('Your shopping cart is empty!')
        this.itemQuantity = page.locator('input[name="quantity\\[51642\\]"]')
        // this.unitPriceLabel = page.locator('tbody tr td:nth-child(5)')
        this.unitPriceLabel = page.locator('//tr//td[position()=5][1]')
        this.totalPriceLabel = page.locator('td:nth-of-type(6)')
        this.quantityLabel = page.locator('input[name="quantity\\[51656\\]"]')


    }

    async checkOut() {
        await this.checkoutButton.click()
        expect(this.page.url()).toContain('checkout/checkout')
    }

    async verifyEmptyCart() {
        await expect(this.emptyCartMsg1).toBeVisible()
        await expect(this.emptyCartMsg2).toBeVisible()
    }

    async removeItem() {

        await expect(this.removeButton).toBeVisible()

        await this.removeButton.click()


    }

    async verifyItemQuantity(quantity: number) {
        await expect(this.itemQuantity).toHaveValue(quantity.toString())
    }

    async getUnitPrice(){
        return (await this.unitPriceLabel.innerText()).replace("$", "");
    }

    async getTotalPrice(){
        return (await this.totalPriceLabel.innerText()).replace("$", "");
    }

    async getQuantity(){
        return await this.quantityLabel.getAttribute("value")
    }

    async totalSum(){
        return parseInt(<string>await this.getQuantity()) *  parseInt(await this.getUnitPrice());
    }

    async verifyTotal(){
        expect(this.totalSum()).toEqual(this.getTotalPrice());
    }


    async gotoEditCartPage() {
        await this.page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart")
    }
}
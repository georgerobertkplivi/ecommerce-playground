import {ProductDetailsPage} from "../ProductDetailsPage";
import {expect, Locator, Page} from "@playwright/test";

// @ts-ignore
export class CartModal extends ProductDetailsPage {
    cartCheckoutButton: Locator;
    private editCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.cartCheckoutButton = page.getByRole('button', { name: ' Checkout' })
        this.editCartButton = page.getByRole('button', { name: ' Edit cart' })

    }

    async checkOutFromCartModal() {
        await this.cartCheckoutButton.click()
        expect(this.page.url()).toContain('checkout')
    }

    async editCart() {
        await this.editCartButton.click()
        expect(this.page.url()).toContain('/cart')
    }


}
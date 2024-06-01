import {expect, Page} from '@playwright/test';
import endpoint from "../configTypes"
import {NavBar} from "./PageFragments/NavBar";

export class HomePage extends NavBar{
    protected page: Page;


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async openUrl() {
        await this.page.goto(endpoint.PRODUCT_STORE_URL);
        expect(this.page.url()).toContain("ecommerce")
    }








}

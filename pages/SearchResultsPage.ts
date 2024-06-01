import {expect, Locator, Page} from "@playwright/test";
import {NavBar} from "./PageFragments/NavBar";
import {Manufacturer} from "./Dataclasses/Manufacturer";
import {Availability} from "./Dataclasses/Availability";

export class SearchResultsPage extends NavBar{
    protected AddtoCart: Locator;
    protected AddtoCartMessage: Locator;
    protected CheckOutButton: Locator;
    protected editCartButton: Locator;
    protected SearchedItem: Locator;
    protected ItemListView: Locator;
    private minimumPrice: Locator;
    private maximumPrice: Locator;
    private PriceLabel: Locator;
    Wishlist: Locator;
    private closePriceFilter: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.AddtoCart = page.getByRole('button', { name: 'Add to Cart' })
        this.AddtoCartMessage = page.getByRole('alert')
        this.SearchedItem = page.locator('.text-ellipsis-2').first()
        this.ItemListView = page.locator("//i[@class='fas fa-th-list']")
        this.CheckOutButton = page.getByRole('button', { name: ' Checkout' })
        this.editCartButton = page.getByRole('button', { name: ' Edit cart' })
        this.minimumPrice = page.locator('#mz-filter-panel-0-0').getByPlaceholder('Minimum Price')
        this.maximumPrice = page.locator('#mz-filter-panel-0-0').getByPlaceholder('Maximum Price')
        this.PriceLabel = page.locator("//span[@class='price-new']")
        this.Wishlist = page.locator("button[class='btn btn-wishlist wishlist-31 '] i[class='fas fa-heart']")
        this.closePriceFilter = page.locator('#mz-filter-content-0 div').filter({ hasText: 'Price to' }).locator('i').nth(1)
    }

    async clickAddToCartButton(){
        await this.AddtoCart.click()
    }

    async switchToItemsListView(){
        await this.ItemListView.click()
    }

    async clickCheckOutButton(){
        await this.CheckOutButton.click()
    }

    async openSearchedItem(){
        await this.SearchedItem.click()
    }

    async clickEditCartButton(){
        await this.editCartButton.click()
    }

    async closeSearchedPrice(){
        await this.closePriceFilter.click()
    }

    async itemAddedToCartMessage(){
        await expect(this.AddtoCartMessage).toContainText('Success: You have added');
    }

    async setMinimumPrice(price: number) {
        const minimumPriceInput = this.minimumPrice
        await minimumPriceInput.click();
        await minimumPriceInput.fill(price.toString());
    }

    async setMaximumPrice(price: number) {
        const maximumPriceInput = this.maximumPrice
        await maximumPriceInput.click();
        await maximumPriceInput.fill(price.toString());
        await this.page.keyboard.press('Enter');
    }

    async clickManufacturerFilterGroup() {
        const manufacturerFilterGroup = this.page.locator("div[class='mz-filter-group manufacturer']");
        await manufacturerFilterGroup.click();
    }

    async manufacturer(manufacturer: Manufacturer) {
        const manufacturerButton = this.page.locator('#mz-filter-panel-0-1').getByText(manufacturer);
        await manufacturerButton.click();
    }

    async getProductPrice() {

        const productPriceText =await this.PriceLabel.first().innerText()
        // @ts-ignore
        return parseFloat(productPriceText.replace('$', ''));
    }

    async setAvailability(availability: Availability) {
        const availabilityElement = this.page.locator('#mz-filter-panel-0-4').getByText(availability);
        await availabilityElement.click();
    }





}
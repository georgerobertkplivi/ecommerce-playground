import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';


import { LoginPage } from '../../pages/Modals/LoginPage';
import {HomePage} from "../../pages/HomePage";
import {SearchResultsPage} from "../../pages/SearchResultsPage";
import {ProductDetailsPage} from "../../pages/ProductDetailsPage";
import {EditCartPage} from "../../pages/EditCartPage";
import {CheckoutPage} from "../../pages/CheckoutPage";

import {Address} from "../../pages/Dataclasses/address";
import {Country} from "../../pages/Dataclasses/countries";
import {Region} from "../../pages/Dataclasses/regions";
import {Categories} from "../../pages/Dataclasses/Categories";
import {Person} from "../../pages/Dataclasses/person";
import { Products, ProductAttributes, ProductData } from "../../pages/Dataclasses/products";


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.openUrl()

    const loginData = new Person("", "", "testonee@test.com", "", "test123", "");


    await loginPage.gotoLoginPage()

    await loginPage.fillLoginForm(loginData)

    await loginPage.clickLoginButton()

    await loginPage.confirmLogin()
});

test.afterEach(async ({ page }) => {

    await page.close();
});

test('Search Product Does Not Exist Test', async ({ page }) => {
    const homePage = new HomePage(page);

    const searchProduct = "iPhone 15";

    await homePage.searchProduct(searchProduct)
    await homePage.noSearchResults(searchProduct)




});


test('Search Products By Category: Laptop', async ({ page }) => {
    const homePage = new HomePage(page);




    await homePage.searchProductByCategory(Categories.LAPTOPS)

    await expect.soft(page.locator('#entry_212469')).toContainText('HTC Touch HD');

});



test('Add and Revmove Product From Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const editCartPage = new EditCartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const searchProduct = "iPod Nano";


    await homePage.searchProduct(searchProduct)
    await searchResultsPage.switchToItemsListView()
    await searchResultsPage.openSearchedItem()
    await expect.soft(productDetailsPage.BuyNowButton).toBeVisible()

    // Get the corresponding product data from the enum
    const productDataFromEnum = ProductData[Products.IPod];

    expect.soft(await productDetailsPage.getProductName()).toBe(productDataFromEnum.productName);
    expect.soft(await productDetailsPage.getItemPrice()).toBe(productDataFromEnum.price);
    expect.soft(await productDetailsPage.getProductAvailability()).toBe(productDataFromEnum.availability);
    expect.soft(await productDetailsPage.getProductBrand()).toBe(productDataFromEnum.brand);


    await searchResultsPage.clickAddToCartButton()


    await searchResultsPage.itemAddedToCartMessage()

    await productDetailsPage.viewCart()

    expect.soft(await productDetailsPage.getCartTotal()).toContain('1')

    expect.soft(editCartPage.unitPriceLabel).toContainText(productDataFromEnum.price)


    await editCartPage.removeItem()

    await editCartPage.verifyEmptyCart()








});

test('Search Product and Add Product To Cart Test', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const editCartPage = new EditCartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const searchProduct = "iPod Nano";


    await homePage.searchProduct(searchProduct)
    await searchResultsPage.switchToItemsListView()
    await searchResultsPage.openSearchedItem()
    await expect.soft(productDetailsPage.BuyNowButton).toBeVisible()

    // Get the corresponding product data from the enum
    const productDataFromEnum = ProductData[Products.IPod];

    expect.soft(await productDetailsPage.getProductName()).toBe(productDataFromEnum.productName);
    expect.soft(await productDetailsPage.getItemPrice()).toBe(productDataFromEnum.price);
    expect.soft(await productDetailsPage.getProductAvailability()).toBe(productDataFromEnum.availability);
    expect.soft(await productDetailsPage.getProductBrand()).toBe(productDataFromEnum.brand);


    await searchResultsPage.clickAddToCartButton()


    await searchResultsPage.itemAddedToCartMessage()

    await productDetailsPage.viewCart()


    expect.soft(editCartPage.unitPriceLabel).toContainText(productDataFromEnum.price)

    await editCartPage.gotoCheckoutPage()

    await checkoutPage.useNewAddress()

    const address = new Address(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        faker.location.street(),
        faker.location.streetAddress(),
        faker.location.city(),
        faker.location.zipCode(),
        Country.UNITED_STATES,
        Region.UNITED_STATES_NEW_YORK
    );


    await checkoutPage.fillCheckoutForm(address)

    await checkoutPage.termsAndConditions()

    await checkoutPage.continue()

    await page.reload()

    await editCartPage.removeItem()

    await editCartPage.verifyEmptyCart()


});

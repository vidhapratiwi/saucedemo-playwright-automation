const { expect } = require("@playwright/test");

export class CartPage {

    constructor(page) {
        this.page = page
        this.cartPageTitle = page.locator('[data-test="title"]')
        this.item1Title = page.getByText('Sauce Labs Backpack')
        this.item2Title = page.getByText('Sauce Labs Bike Light')
        this.item3Title = page.getByText('Sauce Labs Fleece Jacket')

        this.item1RemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]')
        this.item2RemoveButton = page.locator('[data-test="remove-sauce-labs-bike-light"]')
        this.item3RemoveButton = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')

        this.checkoutButton = page.locator('[data-test="checkout"]')
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async validateCartPage() {
        await expect(this.cartPageTitle).toBeVisible()
        
        //visual comparison
        //await expect(this.page).toHaveScreenshot('cart-page.png', { maxDiffPixels : 1000})
    }

    async validateItemCart() {
        await expect(this.item1Title).toBeVisible()
        await expect(this.item2Title).toBeVisible()
        await expect(this.item3Title).toBeVisible()
    }

    async removeProduct() {
        await this.item1RemoveButton.click()
        await this.item2RemoveButton.click()
        await this.item3RemoveButton.click()
    }

    async continueCheckout() {
        await this.checkoutButton.click()
    }

    async showErrorMessage() {
        await expect(this.errorMessage).toBeVisible()
    }


}
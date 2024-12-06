const { expect } = require("@playwright/test");

export class DashboardPage {

    constructor(page) {
        this.page = page
        this.pageTitle = page.getByText('Swag Labs')
        this.menuButton = page.getByRole('button', { name: 'Open Menu' })
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
        this.sortButton = page.locator('[data-test="product-sort-container"]')

        this.item1Title = page.getByText('Sauce Labs Backpack')
        this.item1Picture = page.locator('[data-test="item-4-img-link"]')
        this.item1Price = page.getByText('$29.99')
        this.item1AddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')    
        this.item1RemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]')

        this.item2Title = page.getByText('Sauce Labs Bike Light')
        this.item2AddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        this.item2RemoveButton = page.locator('[data-test="remove-sauce-labs-bike-light"]')

        this.item3Title = page.getByText('Sauce Labs Fleece Jacket')
        this.item3AddButton = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')       
        this.item3RemoveButton = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')
    }

    async validateOnPage() {
        await expect(this.pageTitle).toBeVisible()
        await expect(this.menuButton).toBeVisible()

        //visual comparison
        //await expect(this.page).toHaveScreenshot('dashboard-page.png', { maxDiffPixels : 1000})
 
    }

    async sortAZ() {
        await this.sortButton.selectOption('az')
    }

    async sortZA() {
        await this.sortButton.selectOption('za')
    }

    async sortLohi() {
        await this.sortButton.selectOption('lohi')
    }

    async sortHilo() {
        await this.sortButton.selectOption('hilo')
    }
    
    async validateProductDetails(){
        await expect(this.item1Title).toBeVisible()
        await expect(this.item1Picture).toBeVisible()
        await expect(this.item1Price).toBeVisible()
        await expect(this.item1AddButton).toBeVisible()
    }

    async selectProduct() {
        await this.item1AddButton.click()
        await this.item2AddButton.click()
        await this.item3AddButton.click()

        await expect(this.item1RemoveButton).toBeVisible()
        await expect(this.item2RemoveButton).toBeVisible()
        await expect(this.item3RemoveButton).toBeVisible()
    }

    async showCart() {
        await this.cartButton.click()
    }

    async removeProduct() {
        await this.item1RemoveButton.click()
        await this.item2RemoveButton.click()
        await this.item3RemoveButton.click()
    }
}
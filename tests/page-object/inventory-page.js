import exp from "constants";

const { expect } = require("@playwright/test");

export class InventoryPage {

    constructor(page){
        this.page = page
        this.itemName = page.locator('[data-test="inventory-item-name"]')
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]')
        this.itemPicture = page.locator('[data-test="item-sauce-labs-backpack-img"]')
        this.itemPrice = page.locator('[data-test="inventory-item-price"]')
        this.addToCartButton = page.locator('[data-test="add-to-cart"]')
        this.removeButton = page.locator('[data-test="remove"]')

        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
    }

    async validateOnPage(){
        await expect(this.itemName).toBeVisible()
        await expect(this.itemDesc).toBeVisible()
        await expect(this.itemPicture).toBeVisible()
        await expect(this.itemPrice).toBeVisible()
        await expect(this.addToCartButton).toBeVisible()
    }

    async clickAddToCart(){
        await this.addToCartButton.click()
    }

    async clickRemoveButton(){
        await this.removeButton.click()
    }

    async validetOnCart(){
        await expect(this.cartBadge).toBeVisible()
    }

    async validateCartEmpty(){
        await expect(this.cartBadge).toBeHidden()
    }

    async removeButtonVisible(){
        await expect(this.removeButton).toBeVisible()
    }

    async addButtonVisible() {
        await expect(this.addToCartButton).toBeVisible()
    }

    async addProductToCart(){
        await this.addToCartButton.click()
        await expect(this.cartBadge).toBeVisible()
        await expect(this.removeButton).toBeVisible()
    }


}

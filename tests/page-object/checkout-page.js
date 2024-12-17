import exp from "constants";

const { expect } = require("@playwright/test");

export class CheckoutPage {

    constructor(page) {
        this.page = page
        this.checkoutPageTitle = page.locator('[data-test="title"]')
        this.firstNameBox = page.locator('[data-test="firstName"]')
        this.lastNameBox = page.locator('[data-test="lastName"]')
        this.postalCodeBox = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        //this.cancelButton = 

        this.item1Title = page.getByText('Sauce Labs Backpack')
        this.item2Title = page.getByText('Sauce Labs Bike Light')
        this.item3Title = page.getByText('Sauce Labs Fleece Jacket')
        this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]')
        this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]')
        this.totalInfoLabel = page.locator('[data-test="total-info-label"]')
        this.totalLabel = page.locator('[data-test="total-label"]')
        this.finishButton = page.locator('[data-test="finish"]')
        this.cancelButton = page.locator('[data-test="cancel"]')

        this.checkoutCompleteMessage = page.locator('[data-test="checkout-complete-container"]')
        this.homeButton = page.locator('[data-test="back-to-products"]')

        this.errorMessage = page.locator('[data-test="error"]')
        this.errorMessageFirstName = page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: First Name is required' }).nth(2)

        this.yourInfoTitle = page.locator('text=Checkout: Your Information')


    }

    async validateCheckoutPage(){
        await expect(this.checkoutPageTitle).toBeVisible()
        //visual comparison
        //await expect(this.page).toHaveScreenshot('checkout-page.png', { maxDiffPixels : 1000})
    }

    async inputFirstName(firstname){
        await this.firstNameBox.fill(firstname)
    }

    async inputLastName(lastname){
        await this.lastNameBox.fill(lastname)
    }

    async inputPostalCode(postalcode){
        await this.postalCodeBox.fill(postalcode)
    }

    async clickContinueButton(){
        await this.continueButton.click()
    }

    async showErrorMessageFirstName(){
        await expect(this.errorMessageFirstName).toBeVisible()
    }

    async showErrorMessage(){
        await expect(this.errorMessage).toBeVisible()
    }

    async checkout(firstname, lastname, postalcode){
        await this.inputFirstName(firstname)
        await this.inputLastName(lastname)
        await this.inputPostalCode(postalcode)
        await this.clickContinueButton()
    }

    async validateOverview() {
        await expect(this.item1Title).toBeVisible()
        await expect(this.item2Title).toBeVisible()
        await expect(this.item3Title).toBeVisible()
        await expect(this.paymentInfoLabel).toBeVisible()
        await expect(this.shippingInfoLabel).toBeVisible()
        await expect(this.totalInfoLabel).toBeVisible()
        await expect(this.totalLabel).toBeVisible()
    }

    async clickFinishButton() {
        await this.finishButton.click()
    }

    async overview(){
        await this.validateCheckoutPage()
        await this.clickFinishButton()
    }

    async clickHomeButton() {
        await this.homeButton.click()
    }

    async completeMessage() {
        await expect(this.checkoutCompleteMessage).toBeVisible()
        await this.clickHomeButton()
    }
    
    async clickCancelButton(){
        await this.cancelButton.click()
    }

    async validateYourInfoPage(){
        await expect(this.yourInfoTitle).toBeVisible()
    }
}
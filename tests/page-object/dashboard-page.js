const { expect } = require("@playwright/test");

export class DashboardPage {

    constructor(page) {
        this.page = page
        this.pageTitle = page.getByText('Swag Labs')
        this.menuButton = page.getByRole('button', { name: 'Open Menu' })
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
        this.sortButton = page.locator('[data-test="product-sort-container"]')

        this.item1Title = page.getByText('Sauce Labs Backpack')
        this.item1AddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.item1RemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]')
        

        this.item2Title = page.getByText('Sauce Labs Bike Light')
        this.item2AddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        this.item2RemoveButton = page.locator('[data-test="remove-sauce-labs-bike-light"]')

        this.item3Title = page.getByText('Sauce Labs Fleece Jacket')
        this.item3AddButton = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')       
        this.item3RemoveButton = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')

        this.sideBarMenu = page.getByRole('button', { name: 'Open Menu' })
        this.allItemOption = page.locator('[data-test="inventory-sidebar-link"]')
        this.aboutOption = page.locator('[data-test="about-sidebar-link"]')
        this.about = page.getByRole('link', { name: 'Saucelabs' })
        this.logoutOption = page.locator('[data-test="logout-sidebar-link"]')
        this.resetOption = page.locator('[data-test="reset-sidebar-link"]')

        this.twitterLink = page.locator('[data-test="social-twitter"]')
        this.twitter = page.getByTestId('UserName').getByText('@saucelabs')
        this.facebookLink = page.locator('[data-test="social-facebook"]')
        this.facebookClose = page.getByLabel('Close')
        this.facebook = page.locator('h1')
        this.linkedinLink = page.locator('[data-test="social-linkedin"]')
        this.linkedinClose = page.getByRole('button', { name: 'Dismiss' })
        this.linkedin = page.getByRole('heading', { name: 'Sauce Labs', exact: true })

        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        
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

    async clickItem1(){
        await this.item1Title.click()
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

    async clickSideBarMenu() {
        await this.sideBarMenu.click()
    }

    async sideBarIsDisplayed() {
        await expect(this.allItemOption).toBeVisible()
        await expect(this.aboutOption).toBeVisible()
        await expect(this.logoutOption).toBeVisible()
        await expect(this.resetOption).toBeVisible()
    }

    async selectAllItemOption() {
        await this.allItemOption.click()
    }

    async selectAboutOption(){
        await this.aboutOption.click()
    }

    async selectLogout() {
        await this.logoutOption.click()
    }

    async selectReset() {
        await this.resetOption.click()
    }

    async logout() {
        await this.sideBarMenu.click()
        await this.logoutOption.click()
    }

    async validateAbout(){
        await expect(this.about).toBeVisible()
    }

    async selectItem1(){
        await this.item1AddButton.click()
    }

    async validateRemoveButton1(){
        await expect(this.item1RemoveButton).toBeVisible()
    }

    async validateAddButton1(){
        await expect(this.item1AddButton).toBeVisible()
    }

    async validateCartBadge(){
        await expect(this.cartBadge).toBeVisible()
    }

    async validateCartEmpty() {
        await expect(this.cartBadge).toBeHidden()
    }

    async clickTwitter(){
        await this.twitterLink.click()
    }

    async validateTwitter(){
        await expect(this.twitter).toBeVisible()
    }

    async clickFacebook(){
        await this.facebookLink.click()
    }

    async validateFacebook(){
        await this.facebookClose.click()
        await expect(this.facebook).toBeVisible()
    }

    async clickLinkedin(){
        await this.linkedinLink.click()
    }

    async clickCloseLinkedin(){
        await this.linkedinClose.click()
    }

    async validateLinkedin(){
        await expect(this.linkedin).toBeVisible()
    }
}
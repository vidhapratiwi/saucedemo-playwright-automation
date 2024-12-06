const { expect } = require("@playwright/test");

export class LoginPage {

    constructor(page) {
        this.page = page
        this.usernameTextBox = page.getByPlaceholder('Username')
        this.passwordTextBox = page.getByPlaceholder('Password')
        this.loginButton = page.getByText('Login')
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com')
        
        //visual comparison
        await expect(this.page).toHaveScreenshot('login-page.png', { maxDiffPixels : 1000})
    }

    async inputUsername(username){
        await this.usernameTextBox.fill(username)
    }

    async inputPassword(password){
        await this.passwordTextBox.fill(password)
    }

    async clickLoginButton(){
        await this.loginButton.click()
    }

    async showErrorMessage(){
        await expect(this.errorMessage).toBeVisible()
    }

    async login(username, password){
        await this.inputUsername(username)
        await this.inputPassword(password)
        await this.clickLoginButton()
    }

}
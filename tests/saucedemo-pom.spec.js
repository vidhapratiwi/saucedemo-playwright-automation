const { expect } = require("@playwright/test");
const { test } = require("./base/base-test");


test('TC 01 - Successful login with valid credentials', async ({ loginPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
});

test('TC 02 - Failed login with valid credentials (locked out user)', async ({ loginPage }) => {
    await loginPage.login(process.env.LOCKED_OUT_USER, process.env.PASSWORD)
    await loginPage.showErrorMessage()
});

test('TC 03 - Succesful login with valid credentials (problem user)', async ({ loginPage }) => {
    await loginPage.login(process.env.PROBLEM_USER, process.env.PASSWORD)
    //next to dashboard page
    //all the products image are the same
});

test('TC 04 - Succesful login with valid credentials (performance glitch)', async ({ loginPage }) => {
    await loginPage.login(process.env.PERFORMANCE_GLITCH_USER, process.env.PASSWORD)
    //glitch for seconds before entering dashboard page
});

test('TC 05 - Succesful login with valid credentials (error user)', async ({ loginPage }) => {
    await loginPage.login(process.env.ERROR_USER, process.env.PASSWORD)
    //next to dashboard page
    //the first two product cant be removed after added to the cart
    //other products cant be added to the cart
});

test('TC 06 - Succesful login with valid credentials (visual_user)', async ({ loginPage }) => {
    await loginPage.login(process.env.VISUAL_USER, process.env.PASSWORD)
    //next to dashboard page
    //different element placement (pixels)
    //test using visual comparison
});

test('TC 07 - Failed login with invalid credentials (coba user & coba password)', async ({ loginPage }) => {
    await loginPage.login(process.env.COBA_USER, process.env.COBA_PASSWORD)
    await loginPage.showErrorMessage()
});

test('TC 08 - Failed login with empty username', async ({ loginPage }) => {
    await loginPage.login(process.env.EMPTY, process.env.PASSWORD)
    await loginPage.showErrorMessage()
});

test('TC 09 - Failed login with empty password', async ({ loginPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.EMPTY)
    await loginPage.showErrorMessage()
});

test('TC 10 - Failed login with empty credentials', async ({ loginPage }) => {
    await loginPage.login(process.env.EMPTY, process.env.EMPTY)
    await loginPage.showErrorMessage()
});

test('TC 11 - Successful Logout', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.logout()
});

test('TC 12 - Scroll to bottom and back to top of the page', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.scrollToBottom()
    await dashboardPage.scrollToTop()
});


test('TC 13 - Display all side bar menu', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.clickSideBarMenu()
    await dashboardPage.sideBarIsDisplayed()
});

test('TC 14 - Side bar menu - All items option', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.clickSideBarMenu()
    await dashboardPage.selectAllItemOption()
    await dashboardPage.validateProductDetails()
});

test('TC 15 - Side bar menu - About', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.clickSideBarMenu()
    await dashboardPage.selectAboutOption()
    await dashboardPage.validateAbout()
});

test('TC 16 - Side bar menu - Logout', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.clickSideBarMenu()
    await dashboardPage.selectLogout()
});

test('TC 17 - Side bar menu - Reset app state', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.selectItem1()
    await dashboardPage.validateCartBadge()
    await dashboardPage.validateRemoveButton1()

    await dashboardPage.clickSideBarMenu()
    await dashboardPage.selectReset()
    await dashboardPage.validateCartEmpty()
    await dashboardPage.validateAddButton1()
});


test('TC 18 - Sorting product (A-Z)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortAZ()
});


test('TC 19 - Sorting product (Z-A)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortZA()
});

test('TC 20 - Sorting product (Low - High)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortLohi()
});

test('TC 21 - Sorting product (High - Low)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortHilo()
});

test('TC 22 - Link on footer - Twitter', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    const newPage = await dashboardPage.clickTwitter()
    await dashboardPage.validateTwitter(newPage)
});

test('TC 23 - Link on footer - Facebook', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    const newPage = await dashboardPage.clickFacebook()
    await dashboardPage.validateFacebook(newPage)
});

test('TC 24 - Link on footer - LinkedIn', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    const newPage = await dashboardPage.clickLinkedin()
    await dashboardPage.validateLinkedin(newPage)
});


test('TC 25 - Show product details', async ({ loginPage, dashboardPage, inventoryPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.clickItem1()
    await inventoryPage.validateOnPage()
});

test('TC 26 - Add product to cart', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
});

test('TC 27 - Add product to cart from product details page', async ({ loginPage, dashboardPage, inventoryPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    await dashboardPage.clickItem1()

    await inventoryPage.validateOnPage()
    await inventoryPage.clickAddToCart()
    await inventoryPage.validetOnCart()
    await inventoryPage.removeButtonVisible()
});


test('TC 28 - Show shopping cart', async ({ loginPage, dashboardPage, cartPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
});

test('TC 29 - Remove product on cart from home page', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.removeProduct()
});


test('TC 30 - Remove product on cart from cart page', async ({ loginPage, dashboardPage, cartPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.removeProduct()
});

test('TC 31 - Remove product on cart from product details page', async ({ loginPage, dashboardPage, inventoryPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.clickItem1()
    await inventoryPage.validateOnPage()

    await inventoryPage.addProductToCart()
    await inventoryPage.clickRemoveButton()
    await inventoryPage.validateCartEmpty()
    await inventoryPage.addButtonVisible()
});

test('TC 32 - Continue button work properly', async ({ loginPage, dashboardPage, cartPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.clickContinueShopping()
    await dashboardPage.validateOnPage()
});

test('TC 33 - Make a successful purchase', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.continueCheckout()

    await checkoutPage.validateCheckoutPage()
    await checkoutPage.checkout(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.POSTAL_CODE)
    await checkoutPage.overview()
    await checkoutPage.completeMessage()
});

test('TC 34 - Make a failed purchase - invalid first name format', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.continueCheckout()

    await checkoutPage.validateCheckoutPage()
    await checkoutPage.checkout(process.env.INVALID, process.env.LAST_NAME, process.env.POSTAL_CODE)
    await checkoutPage.showErrorMessage()
});

test('TC 35 - Make a failed purchase - invalid last name format', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.continueCheckout()

    await checkoutPage.validateCheckoutPage()
    await checkoutPage.checkout(process.env.FIRST_NAME, process.env.INVALID, process.env.POSTAL_CODE)
    await checkoutPage.showErrorMessage()
});

test('TC 36 - Make a failed purchase - invalid zip / postal code format', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.continueCheckout()

    await checkoutPage.validateCheckoutPage()
    await checkoutPage.checkout(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.INVALID)
    await checkoutPage.showErrorMessage()
});


test('TC 37 - Make a failed purchase with no product', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.continueCheckout()
    await cartPage.showErrorMessage()
    
    // await checkoutPage.validateCheckoutPage()
    // await checkoutPage.checkout(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.POSTAL_CODE)
    // await checkoutPage.overview()
    // await checkoutPage.completeMessage()
});

test('TC 38 - Make a failed purchase without filling information form', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.continueCheckout()

    await checkoutPage.validateCheckoutPage()
    await checkoutPage.checkout(process.env.EMPTY, process.env.EMPTY, process.env.EMPTY)
    await checkoutPage.showErrorMessageFirstName()
    
});

test('TC 39 - Cancel button work properly - Checkout: Your Information page', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.continueCheckout()

    await checkoutPage.validateCheckoutPage()
    await checkoutPage.clickCancelButton()
    await cartPage.validateCartPage()
});

test('TC 40 - Cancel button work properly - Checkout: Overview page', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.continueCheckout()

    await checkoutPage.validateCheckoutPage()
    await checkoutPage.checkout(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.POSTAL_CODE)
    await checkoutPage.validateOverview()
    await checkoutPage.clickCancelButton()
    await checkoutPage.validateYourInfoPage()
});




test.beforeAll(async () => {
    console.log("setup test env")
});

test.beforeEach(async () => {
    console.log("clean up item on cart")
});

//screenshot for failed test cases
//visual comparison
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log("Test failed, perform screenshot")
        const image = await page.screenshot({path: 'failed screenshot.png', fullPage:true})
        testInfo.attach('failed test', {
            body: image,
            contentType: 'image/png',
        })
    }

});
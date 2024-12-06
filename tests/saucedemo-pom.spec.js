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

test('TC 11 - Sorting product (A-Z)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortAZ()
});


test('TC 12 - Sorting product (Z-A)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortZA()
});

test('TC 13 - Sorting product (Low - High)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortLohi()
});

test('TC 14 - Sorting product (High - Low)', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.sortHilo()
});

test('TC 15 - Show product details', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()

    await dashboardPage.validateProductDetails()
});

test('TC 16 - Add product to cart', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
});

test('TC 17 - Show shopping cart', async ({ loginPage, dashboardPage, cartPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
});

test('TC 18 - Remove product on cart from home page', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.removeProduct()
});


test('TC 19 - Remove product on cart from cart page', async ({ loginPage, dashboardPage, cartPage }) => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD)
    await dashboardPage.validateOnPage()
    
    await dashboardPage.selectProduct()
    await dashboardPage.showCart()

    await cartPage.validateCartPage()
    await cartPage.validateItemCart()
    await cartPage.removeProduct()
});

test('TC 20 - Make a successful purchase', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
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

test('TC 21 - Make a failed purchase with no product', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
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

test('TC 22 - Make a failed purchase without filling information form', async ({ loginPage, dashboardPage, cartPage, checkoutPage }) => {
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
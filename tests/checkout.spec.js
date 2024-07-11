const { test, expect } = require('@playwright/test');

// Function to generate a random number between a given range
let random =function(max,min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//An array of objects to store the individual product name and price
let products = [];

test.describe('SauceLabsExamplePage', () => {
    
    test('CheckoutFlow', async({page}) => {
        page.on('console', msg => console.log(msg.text()));
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });
        const usernames = await page.getByTestId('login-credentials').textContent();
        console.log(usernames);
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
        

        // Fetching the total numer of products by getting a count of Add To Cart Buttons present on the page.
        const AddToCart = page.getByText('Add to cart');
        let NoOfAddToCart = await AddToCart.count();
        console.log(NoOfAddToCart);
        
        // Adding 3 products to the cart by clicking on 3 different Add To Cart buttons at random
        while (NoOfAddToCart >3) {
            await AddToCart.nth(random(NoOfAddToCart,0)).click();
            NoOfAddToCart -=1;
        }

        let i=0;
        while (i<3){
            //Capturing the details of the products added to cart by clicking on the add to cart button to asser the details on the checkout page.
            let tempprod={};

            //Getting hold of the Remove button that is brought to the fore for every item/element that is added to the cart
            let RemoveBtn = page.getByText('Remove');

            //Fetching the parent element of that Remove button element
            let parent = page.getByTestId('inventory-item-description').filter({ has: RemoveBtn }).nth(i);

            i+=1;

            
            //Fetching the product price and name using the parent element of the Remove button item and adding them to the products array
            let product =  parent.getByTestId('inventory-item-name');
            let prodname =await product.textContent();
            console.log("Product added is "+prodname);
            let prodprice = await parent.getByTestId('inventory-item-price').textContent();
            console.log(prodname + "'s price is " + prodprice);
            tempprod.productname = prodname;
            tempprod.productprice = prodprice;
            products.push(tempprod);

        }
        //Logging the products array of objects
        console.log(products);
            

        const productCountinCart = await page.getByTestId('shopping-cart-badge').textContent();
        console.log(productCountinCart);


        // Clicking on the Cart button
        await page.getByTestId('shopping-cart-badge').click();


        //Assert the price and name of the items present in the checkout match with those that were added to the products array.
        products.forEach(async (item)=>{
        console.log(item['productname']);
        let productName = item['productname'];
        let product = page.getByText(productName).nth(0);
        await expect(product).toBeVisible();

        let parent = page.getByTestId('inventory-item').filter({ has: product });
        let productPrice = await parent.getByTestId('inventory-item-price').textContent();
        console.log(item['productname'] + "'s price on checkout " + productPrice );
        expect(productPrice).toBe(item['productprice']);
         })


        // Click on the checkout button 
        await page.getByTestId('checkout').click();

        //Assert that Your Information page is loaded
         await expect(page.getByText('Checkout: Your Information')).toBeVisible();

        // Entering the Your Information form
        await page.getByTestId('firstName').fill('TestFirstName');
        await page.getByTestId('lastName').fill('TestLastName');
        await page.getByTestId('postalCode').fill('000323');
        await page.getByTestId('continue').click();


        //Clicking on the Finish button
        await page.getByTestId('finish').click();

        //Add Code to assert the last page is loaded correctly
        await expect(page.getByText('Thank you for your order!')).toBeVisible();

 })
})


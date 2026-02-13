// 1. Initialize the cart count
let count = 0;

// 2. Select the Cart Number span and all Buttons
const cartBadge = document.getElementById('cart-count');
const buttons = document.querySelectorAll('.add-to-cart-btn');

// 3. Loop through every button to add a click listner
buttons.forEach(button => {
    button.addEventListener('click', () => {
        //Increase the count
        count++;

        // Update the text on the screen
        cartBadge.innerText = count;
    })
})
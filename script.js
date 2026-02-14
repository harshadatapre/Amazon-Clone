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

let count = localStorage.getItem('amazonCartCount') || 0;
const cartBadge = document.getElementById('cart-count');
cartBadge.innerText = count;

const buttons = document.querySelectorAll('.add-to-cart-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Update Cart Count
        count++;
        cartBadge.innerText = count;
        localStorage.setItem('amazonCartCount', count);

        // 2. Trigger the Success Message
        showSuccessMessage();
    });
});

function showSuccessMessage() {
    // Create the element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    // Add content (including a little checkmark icon)
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #2ed573;"></i> Item added to cart!`;

    // Append to body
    document.body.appendChild(toast);

    // Automatically remove it from the code after 3 seconds 
    // (Matches the CSS animation time)
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
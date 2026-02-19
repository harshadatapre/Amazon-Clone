const cartContainer = document.getElementById('cart-items-container');
const totalItemsElement = document.getElementById('total-items');
const grandTotalElement = document.getElementById('grand-total');

function renderCheckout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "Your Amazon Cart is empty.";
        updateSummary(0, 0);
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
                <h4>${item.title}</h4>
                <p style="color: #B12704;">$${item.price}</p>
                <button class="remove-btn" onclick="removeItem(${index})">Delete</button>
            </div>
        </div>
    `).join('');

    // Added parseFloat to ensure math works correctly
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    updateSummary(cart.length, total);
}

function updateSummary(count, total) {
    totalItemsElement.innerText = count;
    grandTotalElement.innerText = total.toFixed(2);
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('amazonCartCount', cart.length);

    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.innerText = cart.length;
    }
    
    renderCheckout();
}

// 1. Initialize the page display
renderCheckout();

// 2. PROCEED TO BUY LOGIC (Added at the bottom)
const buyBtn = document.querySelector('.amazon-btn');

if (buyBtn) {
    buyBtn.addEventListener('click', () => {
        console.log("Proceed button clicked!");

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (cart.length === 0) {
            alert("Your cart is empty! Add some items first.");
            return;
        }

        if (isLoggedIn === 'true') {
            localStorage.removeItem('cart');
            localStorage.setItem('amazonCartCount', 0);
            window.location.href = 'success.html';
        } else {
            // Redirects to login if not authenticated
            window.location.href = 'login.html';
        }
    });
} else {
    console.error("Could not find the Proceed to Buy button!");
}
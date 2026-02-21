const cartContainer = document.getElementById('cart-items-container');
const totalItemsElement = document.getElementById('total-items');
const grandTotalElement = document.getElementById('grand-total');

// --- 1. DISPLAY LOGIC ---
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

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    updateSummary(cart.length, total);
}

function updateSummary(count, total) {
    totalItemsElement.innerText = count;
    grandTotalElement.innerText = total.toFixed(2);
}

// --- 2. DELETE LOGIC ---
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

// --- 3. PURCHASE LOGIC ---
function handlePurchase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (cart.length === 0) {
        alert("Your cart is empty! Add some items first.");
        return;
    }

    if (isLoggedIn === 'true') {
        // User is logged in: Clear everything and go to success page
        localStorage.removeItem('cart');
        localStorage.setItem('amazonCartCount', 0);
        window.location.href = 'payment.html';
    } else {
        // User is a guest: Send to login first
        alert("Please sign in to complete your purchase.");
        window.location.href = 'login.html';
    }
}

// --- 4. EXECUTION ---
renderCheckout();

const buyBtn = document.querySelector('.amazon-btn');
if (buyBtn) {
    buyBtn.addEventListener('click', handlePurchase);
} else {
    console.error("Could not find the Proceed to Buy button!");
}
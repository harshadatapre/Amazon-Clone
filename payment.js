// --- THE GUARD RAIL ---
// This runs the millisecond payment.html opens
const checkLogin = localStorage.getItem('isLoggedIn');

if (checkLogin !== 'true') {
    // If they aren't logged in, don't even let them see the page
    alert("You must be signed in to access the payment page.");
    window.location.href = 'login.html'; 
}
// -----------------------

// Rest of your payment logic (the spinner, the confirm button, etc.) starts here...

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const payBtn = document.getElementById('pay-btn');
    const cardNum = document.getElementById('card-num').value;

    // 1. Basic Check
    if (cardNum.length < 16) {
        alert("Invalid card number!");
        return;
    }

    // 2. Start Loading State
    payBtn.classList.add('show-spinner');
    payBtn.disabled = true;

    // 3. The "Processing" Delay (2 Seconds)
    setTimeout(() => {
        // Clear Cart
        localStorage.removeItem('cart');
        localStorage.setItem('amazonCartCount', 0);

        // Success!
        window.location.href = 'success.html';
    }, 2000); 
});
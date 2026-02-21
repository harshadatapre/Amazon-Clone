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
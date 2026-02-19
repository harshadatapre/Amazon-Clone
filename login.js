document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop the page from refreshing

    const email = document.getElementById('email-input').value;

    // 1. Save the user session
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', email);

    // 2. Redirect back to the checkout page
    // Using document.referrer allows us to send them back to where they came from
    if (document.referrer.includes("checkout.html")) {
        window.location.href = "checkout.html";
    } else {
        window.location.href = "index.html";
    }
});
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;

    // 1. "Register" the user by saving their info
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', email);
    localStorage.setItem('userName', name); // Store the actual name for the Navbar

    alert("Account created successfully!");

    // 2. Redirect to the Home Page or Checkout
    window.location.href = 'index.html';
});
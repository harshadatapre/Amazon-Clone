// 1. Initialize the cart count (Fixed with parseInt to ensure it's a number)
let count = parseInt(localStorage.getItem('amazonCartCount')) || 0;

// 2. Select the Cart Number span and all Buttons
const cartBadge = document.getElementById('cart-count');
const buttons = document.querySelectorAll('.add-to-cart-btn');

// Set the initial value on the badge
cartBadge.innerText = count;

// 3. Loop through every button to add a click listener
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Increase the count
        count++;

        // Update the text on the screen
        cartBadge.innerText = count;
        
        // Save to local storage
        localStorage.setItem('amazonCartCount', count);

        // Trigger the Success Message
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
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// search listener

const searchInput = document.querySelector('.search-input');
const productCards = document.querySelectorAll('.product-card');
const noResultsMessage = document.getElementById('no-results');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    let visibleCount = 0; // Keep track of matches

    productCards.forEach(card => {
        const isVisible = card.innerText.toLowerCase().includes(value);
        
        if (isVisible) {
            card.style.display = "block";
            visibleCount++; // We found a match!
        } else {
            card.style.display = "none";
        }
    });

    // If visibleCount is 0, show the "No Results" message
    if (visibleCount === 0) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
});


// 1. Select the Clear Button
const clearBtn = document.getElementById('clear-cart-btn');

// 2. Add the click event
clearBtn.addEventListener('click', () => {
    // A. Ask the user if they are sure (optional but professional!)
    const confirmClear = confirm("Are you sure you want to empty your cart?");
    
    if (confirmClear) {
        // B. Reset the count variable to 0
        count = 0;

        // C. Update the badge on the screen
        cartBadge.innerText = count;

        // D. Delete the data from the browser's memory
        localStorage.removeItem('amazonCartCount');

        // E. Show a quick alert or toast
        alert("Cart cleared!");
    }
});
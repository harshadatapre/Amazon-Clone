// 1. GLOBAL VARIABLES
let count = parseInt(localStorage.getItem('amazonCartCount')) || 0;
const cartBadge = document.getElementById('cart-count');

// Initialize the badge on page load
if (cartBadge) cartBadge.innerText = count;

// 2. THE DATA LAYER (Loading Products)
async function loadProducts() {
    const loadingMessage = document.getElementById('loading-spinner');
    
    try {
        // 1. Fetch the data
        const response = await fetch('products.json');

        // 2. CHECK: If the file is missing (404), throw an error
        if (!response.ok) {
            throw new Error("Could not find the products file.");
        }

        const products = await response.json();
        const containers = document.querySelectorAll('.product-container');

        // 3. Create the HTML
        const productHTML = products.map(product => `
            <div class="box product-card" data-category="${product.category}">
                <div class="box-content">
                    <h2>${product.title}</h2>
                    <div class="box-img" style="background-image: url('${product.image}');"></div>
                    <p class="price">$${product.price}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // 4. Inject and HIDE the loading message
        containers.forEach(container => {
            container.innerHTML = productHTML;
        });
        
        // Success! Hide loading
        if(loadingMessage) loadingMessage.style.display = 'none';

        // Initialize features
        initializeCartLogic();
        initializeSearchLogic();
        initializeCategoryFilters();

    } catch (error) {
        // 5. If something goes wrong, tell the user!
        console.error("Critical Error:", error);
        if(loadingMessage) {
            loadingMessage.innerHTML = "⚠️ Sorry, we can't load products right now.";
            loadingMessage.style.color = "red";
        }
    }
}

// 3. CART LOGIC
function initializeCartLogic() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Find the parent card of the button clicked
            const card = e.target.closest('.product-card');
            
            // Capture product details
            const product = {
                title: card.querySelector('h2').innerText,
                price: parseFloat(card.querySelector('.price').innerText.replace('$', '')),
                image: card.querySelector('.box-img').style.backgroundImage.slice(5, -2) // Extracts the URL
            };

            // 1. Get current cart from LocalStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // 2. Add the new product object to the array
            cart.push(product);
            
            // 3. Save back to LocalStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // 4. Update the visual count
            count = cart.length;
            cartBadge.innerText = count;
            localStorage.setItem('amazonCartCount', count); // Keep your existing counter synced
            
            showSuccessMessage();
        });
    });
}

// 4. SEARCH LOGIC (Wrapped in a function)
function initializeSearchLogic() {
    const searchInput = document.querySelector('.search-input');
    const noResultsMessage = document.getElementById('no-results');

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        // Re-select cards because they were created dynamically
        const productCards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector('h2').innerText.toLowerCase();
            if (title.includes(value)) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
        }
    });
}

// 5. TOAST NOTIFICATION
function showSuccessMessage() {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #2ed573;"></i> Item added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 6. CLEAR CART 
const clearBtn = document.getElementById('clear-cart-btn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to empty your cart?")) {
            count = 0;
            cartBadge.innerText = count;
            // Clear BOTH keys
            localStorage.removeItem('amazonCartCount');
            localStorage.removeItem('cart'); 
            alert("Cart cleared!");
        }
    });
}

// START EVERYTHING
loadProducts();

// category filter
function initializeCategoryFilters() {
    const filters = document.querySelectorAll('.filter-link');
    const productCards = document.querySelectorAll('.product-card');
    const noResultsMessage = document.getElementById('no-results');

    filters.forEach(link => {
        link.addEventListener('click', () => {
            const selectedCategory = link.getAttribute('data-category');
            let visibleCount = 0;

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // If 'All' is clicked or the categories match
                if (selectedCategory === "all" || cardCategory === selectedCategory) {
                    card.style.display = "block";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            // Show "No Results" if a category is empty
            if (noResultsMessage) {
                noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
            }
        });
    });
}

//update cart
function updateHomeNavbar() {
    const userDisplay = document.getElementById('nav-user-info');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');

    // 1. Update the User Name (if logged in)
    if (userDisplay && isLoggedIn === 'true' && userName) {
        userDisplay.innerHTML = `
            <p>Hello, ${userName}</p>
            <p class="nav-second" id="logout-btn" style="color: #f08804; cursor: pointer;">Sign Out</p>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            window.location.reload();
        });
    }

    // 2. ALWAYS update the Cart Badge (from LocalStorage)
    const cartBadge = document.getElementById('cart-count');
    const savedCount = localStorage.getItem('amazonCartCount') || 0;
    
    if (cartBadge) {
        cartBadge.innerText = savedCount;
    }
}

updateHomeNavbar();
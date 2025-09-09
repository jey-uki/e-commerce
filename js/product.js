// Function to display products
function displayProducts(productsToShow) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productGrid.innerHTML = '<div class="col-12 text-center"><h4>No products found in this category</h4></div>';
        return;
    }

    productsToShow.forEach(product => {
        // Determine stock status
        let stockStatus = 'in-stock';
        let stockText = `In Stock (${product.stock})`;

        if (product.stock === 0) {
            stockStatus = 'out-of-stock';
            stockText = 'Out of Stock';
        } else if (product.stock < 10) {
            stockStatus = 'low-stock';
            stockText = `Low Stock (${product.stock})`;
        }

        const productCard = `
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="product-title">${product.title}</h5>
                                <div class="mb-2">
                                    <span class="badge bg-secondary">${product.category}</span>
                                </div>
                                <div class="mt-auto">
                                    <p class="price">$${product.price.toFixed(2)}</p>
                                    <p class="stock ${stockStatus}"><i class="fas fa-box"></i> ${stockText}</p>
                                    <button class="btn btn-primary w-100 cart-btn" ${product.stock === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-shopping-cart"></i> ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        productGrid.innerHTML += productCard;
    });
}

// Function to setup category buttons
function setupCategoryFilters() {
    const categoryContainer = document.getElementById('category-buttons');

    // Get all unique categories
    const categories = ['all', ...new Set(products.map(product => product.category))];

    // Create buttons for each category
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'category-btn');
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        button.dataset.category = category;

        // Set the first button as active
        if (category === 'all') {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            button.classList.add('active');

            // Filter products
            if (category === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                displayProducts(filteredProducts);
            }
        });

        categoryContainer.appendChild(button);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupCategoryFilters();
    displayProducts(products); // Show all products initially
});
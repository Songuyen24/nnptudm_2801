const apiUrl = 'https://api.escuelajs.co/api/v1/products';
const productList = document.getElementById('product-list');

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

function renderProducts(products) {
    productList.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        // Create product card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Create image
        const img = document.createElement('img');
        img.src = product.images[0] || 'https://via.placeholder.com/200'; // Fallback image
        img.alt = product.title;
        img.classList.add('product-image');
        
        // Handle image error (if image url is broken)
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/200';
        };

        // Create info container
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('product-info');

        // Title
        const title = document.createElement('h2');
        title.classList.add('product-title');
        title.textContent = product.title;

        // Description
        const description = document.createElement('p');
        description.classList.add('product-description');
        description.textContent = product.description;

        // Price
        const price = document.createElement('p');
        price.classList.add('product-price');
        price.textContent = `$${product.price}`;

        // Append elements
        infoDiv.appendChild(title);
        infoDiv.appendChild(description);
        infoDiv.appendChild(price);

        productCard.appendChild(img);
        productCard.appendChild(infoDiv);

        productList.appendChild(productCard);
    });
}

// Initialize
fetchProducts();
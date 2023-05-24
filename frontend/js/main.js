const productDisplay = document.getElementById('product-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPage = 1;
const productsPerPage = 10;

// Simulación de la obtención de datos del servidor
const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    image: 'https://via.placeholder.com/200x200',
}));

function renderProducts(page) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    productDisplay.innerHTML = '';

    products.slice(startIndex, endIndex).forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar al carrito</button>
        `;
        productDisplay.appendChild(productElement);
    });
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts(currentPage);
    }
});

renderProducts(currentPage);
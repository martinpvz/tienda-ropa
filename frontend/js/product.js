const productDetails = document.getElementById('product-details');
const relatedProductsList = document.querySelector('.product-list');

// Simulación de la obtención de datos del producto y productos relacionados del servidor
const product = {
    id: 1,
    name: 'Producto 1',
    category: 'Categoría 1',
    description: 'Esta es la descripción del producto 1.',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
};

const relatedProducts = [
    {
        id: 2,
        name: 'Producto 2',
        category: 'Categoría 1',
        image: 'https://via.placeholder.com/100',
    },
    {
        id: 3,
        name: 'Producto 3',
        category: 'Categoría 1',
        image: 'https://via.placeholder.com/100',
    },
    {
        id: 4,
        name: 'Producto 4',
        category: 'Categoría 1',
        image: 'https://via.placeholder.com/100',
    },
    ];

// Función para agregar el detalle del producto al DOM
const displayProductDetails = (product) => {
    productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="max-width: 150px; border-radius: 5px; margin-bottom: 1rem;">
        <h2>${product.name}</h2>
        <p>Categoría: ${product.category}</p>
        <p>${product.description}</p>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn">Agregar al carrito</button>
    `;
};

// Función para agregar productos relacionados al DOM
const displayRelatedProducts = (products) => {
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
        `;
        relatedProductsList.appendChild(productCard);
    });
};

// Llamada a las funciones para mostrar los datos en la página
displayProductDetails(product);
displayRelatedProducts(relatedProducts);
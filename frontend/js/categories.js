// const categoriesSection = document.getElementById('categories');
// const modal = document.getElementById('modal');
// const closeModal = document.getElementById('close-modal');
// const modalTitle = document.getElementById('modal-title');
// const modalProducts = document.getElementById('modal-products');

// const categories = [
//     { id: 'cat1', name: 'Camisetas' },
//     { id: 'cat2', name: 'Pantalones' },
//     { id: 'cat3', name: 'Sudaderas' },
//     { id: 'cat4', name: 'Accesorios' },
// ];

// const products = [
//     {
//         id: 'prod1',
//         name: 'Camiseta básica',
//         category: 'cat1',
//         price: 9.99,
//         image: 'https://example.com/camiseta-basica.jpg',
//     },
//     {
//         id: 'prod2',
//         name: 'Pantalón de mezclilla',
//         category: 'cat2',
//         price: 29.99,
//         image: 'https://example.com/pantalon-mezclilla.jpg',
//     },
//     {
//         id: 'prod3',
//         name: 'Sudadera con capucha',
//         category: 'cat3',
//         price: 39.99,
//         image: 'https://example.com/sudadera-capucha.jpg',
//     },
//     {
//         id: 'prod4',
//         name: 'Gorra deportiva',
//         category: 'cat4',
//         price: 14.99,
//         image: 'https://example.com/gorra-deportiva.jpg',
//     },
//     ];

// const displayCategories = (categories) => {
//     categories.forEach((category) => {
//         const categoryCard = document.createElement('div');
//         categoryCard.className = 'category-card';
//         categoryCard.innerHTML = `
//             <h3>${category.name}</h3>
//         `;
//         categoryCard.addEventListener('click', () => openModal(category.id));
//         categoriesSection.appendChild(categoryCard);
//     });
// };

// const openModal = (categoryId) => {
//     modalTitle.textContent = categories.find((cat) => cat.id === categoryId).name;
//     const filteredProducts = products.filter((product) => product.category === categoryId);
//     displayProducts(filteredProducts);
//     modal.classList.remove('hidden');
// };

// const closeModalHandler = () => {
//     modal.classList.add('hidden');
//     modalProducts.innerHTML = '';
// };

// const displayProducts = (products) => {
//     products.forEach((product) => {
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         productCard.innerHTML = `
//             <img src="${product.image}" alt="${product.name}">
//             <h3>${product.name}</h3>
//             <p>$${product.price.toFixed(2)}</p>
//             <button class="add-to-cart-btn">Agregar al carrito</button>
//         `;
//         modalProducts.appendChild(productCard);
//     });
// };

// displayCategories(categories);
// closeModal.addEventListener('click', closeModalHandler);



const categoriesSection = document.getElementById('categories');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalProducts = document.getElementById('modal-products');

async function fetchCategoryProducts() {
  try {
    const response = await fetch('http://localhost:3004/categories');
    const categoryProducts = await response.json();
    return categoryProducts;
  } catch (err) {
    console.error(err);
  }
}

const displayCategories = async () => {
  const categoryProducts = await fetchCategoryProducts();
  const displayedCategories = new Set();
  const productsByCategory = {};

  categoryProducts.forEach((item) => {
    const categoryId = item.category_id;
    const categoryName = item.category_name;
    if (!displayedCategories.has(categoryId)) {
      displayedCategories.add(categoryId);
      
      const categoryCard = document.createElement('div');
      categoryCard.className = 'category-card';
      categoryCard.innerHTML = `
          <h3>${categoryName}</h3>
      `;
      categoryCard.addEventListener('click', () => openModal(categoryId));
      categoriesSection.appendChild(categoryCard);
    }

    if (!productsByCategory[categoryId]) {
      productsByCategory[categoryId] = [];
    }
    productsByCategory[categoryId].push(item);
  });

  window.productsByCategory = productsByCategory;
};

const openModal = (categoryId) => {
  const categories = Array.from(new Set(Object.keys(window.productsByCategory)));
  const category = categories.find((cat) => cat === categoryId);
  modalTitle.textContent = category;
  const filteredProducts = window.productsByCategory[categoryId];
  displayProducts(filteredProducts);
  modal.classList.remove('hidden');
};

const closeModalHandler = () => {
  modal.classList.add('hidden');
  modalProducts.innerHTML = '';
};

const displayProducts = (products) => {
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.product_image}" alt="${product.product_name}">
        <h3>${product.product_name}</h3>
        <p>$${parseFloat(product.product_price).toFixed(2)}</p>
        <button class="add-to-cart-btn">Agregar al carrito</button>
    `;
    modalProducts.appendChild(productCard);
  });
};

displayCategories();
closeModal.addEventListener('click', closeModalHandler);
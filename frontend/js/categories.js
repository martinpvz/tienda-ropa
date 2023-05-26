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

const createUserAndGetId = async () => {
  try {
    const response = await fetch('http://localhost:3004/user', {method: 'GET',credentials: 'include'});
    const data = await response.json();
    return data.userId;
  } catch (error) {
    console.error(error);
  }
};
createUserAndGetId()

const addToCartTest = async (userId, productId) => {
  const response = await fetch('http://localhost:3004/addCart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, productId }),
  });

  const data = await response.json();
  console.log(data);
};

const provisionalUserId = 1; // Define un userId provisional

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

const displayProducts = async (products) => {
  const userId = await createUserAndGetId();
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    console.log(product);
    productCard.innerHTML = `
        <img src="${product.product_image}" alt="${product.product_name}">
        <h3>${product.product_name}</h3>
        <p>$${parseFloat(product.product_price).toFixed(2)}</p>
        <button class="add-to-cart-btn"  onclick="addToCartTest(${userId}, ${product.product_id})">Agregar al carrito</button>
    `;
    modalProducts.appendChild(productCard);
  });
};

displayCategories();
closeModal.addEventListener('click', closeModalHandler);
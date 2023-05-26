const productDisplay = document.getElementById('product-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPage = 1;
const productsPerPage = 10;

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

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3004/products');
    const products = await response.json();
    console.log(products)
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

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

const provisionalUserId = 2; // Define un userId provisional

async function renderProducts(page) {
  const products = await fetchProducts();
  const userId = await createUserAndGetId(); // Define un userId provisional
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const totalPages = Math.ceil(products.length / productsPerPage);
  productDisplay.innerHTML = '';

  products.slice(startIndex, endIndex).forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2><a href="./product-details.html?id=${product.id}">${product.name}</a></h2>
        <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar al carrito</button>
    `;
    productDisplay.appendChild(productElement);

    // Agrega un evento de escucha al botón "Agregar al carrito"
    const addToCartBtn = productElement.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
      const productId = addToCartBtn.dataset.productId;
      addToCartTest(userId, productId);
    });
  });

  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(currentPage);
    }
  };
}

  renderProducts(currentPage);
  
  async function setupPagination() {
    const products = await fetchProducts();
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts(currentPage);
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts(currentPage);
      }
    });
  
    renderProducts(currentPage);
  }

  
  // Llamar a setupPagination en lugar de renderProducts
  setupPagination();
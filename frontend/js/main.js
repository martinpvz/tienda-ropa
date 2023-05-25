// const productDisplay = document.getElementById('product-display');
// const prevBtn = document.getElementById('prev-btn');
// const nextBtn = document.getElementById('next-btn');

// let currentPage = 1;
// const productsPerPage = 10;

// // Simulación de la obtención de datos del servidor
// const products = Array.from({ length: 20 }, (_, i) => ({
//     id: i + 1,
//     name: `Producto ${i + 1}`,
//     image: 'https://via.placeholder.com/200x200',
// }));

// function renderProducts(page) {
//     const startIndex = (page - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     productDisplay.innerHTML = '';

//     products.slice(startIndex, endIndex).forEach(product => {
//         const productElement = document.createElement('div');
//         productElement.classList.add('product');
//         productElement.innerHTML = `
//             <img src="${product.image}" alt="${product.name}">
//             <h2>${product.name}</h2>
//             <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar al carrito</button>
//         `;
//         productDisplay.appendChild(productElement);
//     });
// }

// prevBtn.addEventListener('click', () => {
//     if (currentPage > 1) {
//         currentPage--;
//         renderProducts(currentPage);
//     }
// });

// nextBtn.addEventListener('click', () => {
//     const totalPages = Math.ceil(products.length / productsPerPage);
//     if (currentPage < totalPages) {
//         currentPage++;
//         renderProducts(currentPage);
//     }
// });

// renderProducts(currentPage);



const productDisplay = document.getElementById('product-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPage = 1;
const productsPerPage = 10;

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

async function renderProducts(page) {
    const products = await fetchProducts();
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const totalPages = Math.ceil(products.length / productsPerPage); // Añadir la definición de totalPages aquí
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
    });
  
    // Actualizar el evento click del botón nextBtn para usar un cierre con acceso a totalPages
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts(currentPage);
      }
    };
  }
  
  // Quitar el evento click de nextBtn aquí, ya que lo hemos movido dentro de renderProducts
  // nextBtn.addEventListener('click', () => {
  //   if (currentPage < totalPages) {
  //     currentPage++;
  //     renderProducts(currentPage);
  //   }
  // });
  
  renderProducts(currentPage);async function setupPagination() {
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
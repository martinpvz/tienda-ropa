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

const getProductIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
};

const productId = getProductIdFromUrl(); // Reemplazar por el ID del producto que deseas mostrar
const productDetails = document.getElementById('product-details');
const relatedProductsList = document.querySelector('.product-list');

const fetchProductData = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3004/singularProduct/${productId}`);
    if (!response.ok) {
      throw new Error(`Error fetching product data: ${response.status}`);
    }
    const data = await response.json();
    displayProductDetails(data.product);
    displayRelatedProducts(data.similarProducts);
  } catch (error) {
    console.error(error);
  }
};

const displayProductDetails = (product) => {
    productDetails.innerHTML = `
        <div class="image-navigation">
            <button class="prev-image-btn">&lt;</button>
            <img src="${product.images[0].ruta_imagen}" alt="${product.name}" id="product-image" style="max-width: 150px; border-radius: 5px; margin-bottom: 1rem;">
            <button class="next-image-btn">&gt;</button>
        </div>
        <h2>${product.name}</h2>
        <p>Categoría: ${product.category_name}</p>
        <p>${product.description}</p>
        <p>Precio: $${parseFloat(product.price).toFixed(2)}</p>
        <button class="add-to-cart-btn" onclick="addToCartTest(1,${product.id})">Agregar al carrito</button>
    `;


  let currentImageIndex = 0;
  const productImage = document.getElementById('product-image');
  const prevImageBtn = document.querySelector('.prev-image-btn');
  const nextImageBtn = document.querySelector('.next-image-btn');

  const updateProductImage = () => {
    productImage.src = product.images[currentImageIndex].ruta_imagen;
  };

  prevImageBtn.addEventListener('click', () => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = product.images.length - 1;
    }
    updateProductImage();
  });

  nextImageBtn.addEventListener('click', () => {
    currentImageIndex++;
    if (currentImageIndex >= product.images.length) {
      currentImageIndex = 0;
    }
    updateProductImage();
  });
};

const displayRelatedProducts = (products) => {
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3><a href="./product-details.html?id=${product.id}">${product.name}</a></h3>
        <p>Precio: $${product.price}</p>
    `;
    relatedProductsList.appendChild(productCard);
  });
};

fetchProductData(productId);
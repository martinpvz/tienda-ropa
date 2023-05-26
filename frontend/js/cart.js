// const cartItems = document.getElementById('cart-items');
// const checkoutBtn = document.getElementById('checkout-btn');

// // Simulación de la obtención de datos del servidor
// const itemsInCart = Array.from({ length: 5 }, (_, i) => ({
//     id: i + 1,
//     name: `Producto ${i + 1}`,
//     image: 'https://via.placeholder.com/100x100',
//     quantity: 1,
// }));

// function renderCartItems() {
//     cartItems.innerHTML = '';

//     itemsInCart.forEach(item => {
//         const cartItemElement = document.createElement('div');
//         cartItemElement.classList.add('cart-item');
//         cartItemElement.innerHTML = `
//             <img src="${item.image}" alt="${item.name}">
//             <divclass="cart-item-info">
//                 <h2>${item.name}</h2>
//             </div>
//             <div class="cart-item-controls">
//                 <button class="control-btn" onclick="decreaseQuantity(${item.id})">-</button>
//                 <span>${item.quantity}</span>
//                 <button class="control-btn" onclick="increaseQuantity(${item.id})">+</button>
//                 <button class="control-btn" onclick="removeFromCart(${item.id})">X</button>
//             </div>
//         `;
//         cartItems.appendChild(cartItemElement);
//     });
// }

// function increaseQuantity(itemId) {
//     const item = itemsInCart.find(i => i.id === itemId);
//     if (item) {
//         item.quantity += 1;
//         renderCartItems();
//     }
// }

// function decreaseQuantity(itemId) {
//     const item = itemsInCart.find(i => i.id === itemId);
//     if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         renderCartItems();
//     }
// }

// function removeFromCart(itemId) {
//     const itemIndex = itemsInCart.findIndex(i => i.id === itemId);
//     if (itemIndex > -1) {
//         itemsInCart.splice(itemIndex, 1);
//         renderCartItems();
//     }
// }

// function checkout() {
//     // Aquí puedes agregar la lógica necesaria para el proceso de pago
//     alert('Procesando pago...');
// }

// checkoutBtn.addEventListener('click', checkout);

// // Inicialización
// renderCartItems();


const cartItems = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');

let itemsInCart = [];

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
  

async function fetchCartItems() {
    try {
        const userId = await createUserAndGetId();
        const response = await fetch(`http://localhost:3004/cart/${userId}`);
        const data = await response.json();
        itemsInCart = data;
        renderCartItems();
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}

function renderCartItems() {
    cartItems.innerHTML = '';

    itemsInCart.forEach(item => {
        console.log(item);
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/100x100'}" alt="${item.name}">
            <div class="cart-item-info">
                <h2>${item.name}</h2>
            </div>
            <div class="cart-item-controls">
                <button class="control-btn" onclick="decreaseQuantity(${item.product_id})">-</button>
                <span>${item.quantity}</span>
                <button class="control-btn" onclick="increaseQuantity(${item.product_id})">+</button>
                <button class="control-btn" onclick="removeFromCart(${item.product_id})">X</button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });
}

// function increaseQuantity(itemId) {
//     const item = itemsInCart.find(i => i.product_id === itemId);
//     if (item) {
//         item.quantity += 1;
//         renderCartItems();
//     }
// }

async function increaseQuantity(itemId) {
    const userId = await createUserAndGetId();
    const url = `http://localhost:3004/addProduct/add`;
    console.log(itemId, userId);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                productId: itemId,
            }),
        });

        if (response.ok) {
            const item = itemsInCart.find(i => i.product_id === itemId);
            if (item) {
                item.quantity += 1;
                renderCartItems();
            }
        } else {
            const error = await response.json();
            console.error('Error calling addProduct API:', error);
        }
    } catch (error) {
        console.error('Error calling addProduct API:', error);
    }
}

// function decreaseQuantity(itemId) {
//     const item = itemsInCart.find(i => i.product_id === itemId);
//     if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         renderCartItems();
//     }
// }

async function decreaseQuantity(itemId) {
    const userId = await createUserAndGetId();
    const url = `http://localhost:3004/addProduct/remove`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId: itemId,
        }),
      });
  
      if (response.ok) {
        const item = itemsInCart.find(i => i.product_id === itemId);
        if (item) {
          item.quantity -= 1;
          if (item.quantity === 0) {
            itemsInCart = itemsInCart.filter(i => i.product_id !== itemId);
          }
          renderCartItems();
        }
      } else {
        const error = await response.json();
        console.error('Error calling removeProduct API:', error);
      }
    } catch (error) {
      console.error('Error calling removeProduct API:', error);
    }
  }

// function removeFromCart(itemId) {
//     const itemIndex = itemsInCart.findIndex(i => i.product_id === itemId);
//     if (itemIndex > -1) {
//         itemsInCart.splice(itemIndex, 1);
//         renderCartItems();
//     }
// }

async function removeFromCart(itemId) {
    const userId = await createUserAndGetId();
    const url = `http://localhost:3004/addProduct/delete`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId: itemId,
        }),
      });
  
      if (response.ok) {
        itemsInCart = itemsInCart.filter(i => i.product_id !== itemId);
        renderCartItems();
      } else {
        const error = await response.json();
        console.error('Error calling deleteProductFromCart API:', error);
      }
    } catch (error) {
      console.error('Error calling deleteProductFromCart API:', error);
    }
  }

// function checkout() {
//     // Aquí puedes agregar la lógica necesaria para el proceso de pago
//     alert('Procesando pago...');
// }

async function checkout() {
    const userId = await createUserAndGetId();
    const url = `http://localhost:3004/addProduct/checkout`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });
  
      if (response.ok) {
        itemsInCart = [];
        renderCartItems();
  
        // Redirigir a la página de agradecimiento por el pago
        window.location.href = '../frontend/thanks.html';
      } else {
        const error = await response.json();
        console.error('Error calling clearCart API:', error);
      }
    } catch (error) {
      console.error('Error calling clearCart API:', error);
    }
  }

checkoutBtn.addEventListener('click', checkout);

fetchCartItems();
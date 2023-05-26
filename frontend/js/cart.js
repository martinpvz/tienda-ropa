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
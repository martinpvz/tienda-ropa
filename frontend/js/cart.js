const cartItems = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');

// Simulación de la obtención de datos del servidor
const itemsInCart = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    image: 'https://via.placeholder.com/100x100',
    quantity: 1,
}));

function renderCartItems() {
    cartItems.innerHTML = '';

    itemsInCart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <divclass="cart-item-info">
                <h2>${item.name}</h2>
            </div>
            <div class="cart-item-controls">
                <button class="control-btn" onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button class="control-btn" onclick="increaseQuantity(${item.id})">+</button>
                <button class="control-btn" onclick="removeFromCart(${item.id})">X</button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });
}

function increaseQuantity(itemId) {
    const item = itemsInCart.find(i => i.id === itemId);
    if (item) {
        item.quantity += 1;
        renderCartItems();
    }
}

function decreaseQuantity(itemId) {
    const item = itemsInCart.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        renderCartItems();
    }
}

function removeFromCart(itemId) {
    const itemIndex = itemsInCart.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
        itemsInCart.splice(itemIndex, 1);
        renderCartItems();
    }
}

function checkout() {
    // Aquí puedes agregar la lógica necesaria para el proceso de pago
    alert('Procesando pago...');
}

checkoutBtn.addEventListener('click', checkout);

// Inicialización
renderCartItems();
const db = require('../db');

const getCartIdByUserId = async (userId) => {
  try {
    const query = 'SELECT id FROM carts WHERE user_id = ?';
    const result = await db.query(query, [userId]);

    if (result.length === 0) {
      throw new Error('No se encontró el carrito asociado al usuario');
    }

    return result[0].id;
  } catch (error) {
    throw error;
  }
};

const addToCart = async (userId, productId) => {
  try {
    const cartId = await getCartIdByUserId(userId);

    const checkProductQuery = 'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?';
    const checkProductResult = await db.query(checkProductQuery, [cartId, productId]);

    if (checkProductResult.length > 0) {
      // El producto ya está en el carrito, incrementar la cantidad
      const updateQuantityQuery = `
        UPDATE cart_items SET quantity = quantity + 1
        WHERE cart_id = ? AND product_id = ?
      `;
      await db.query(updateQuantityQuery, [cartId, productId]);
    } else {
        console.log("entro al else");
      // El producto no está en el carrito, agregarlo con cantidad 1
      const insertProductQuery = `
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES (?, ?, 1)
      `;
      await db.query(insertProductQuery, [cartId, productId]);
    }

    console.log('Producto agregado al carrito correctamente');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addToCart,
};
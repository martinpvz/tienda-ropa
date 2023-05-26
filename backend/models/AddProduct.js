// models/AddProduct.js
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

const addProduct = async (userId, productId) => {
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

const removeProduct = async (userId, productId) => {
    try {
      const cartId = await getCartIdByUserId(userId);
  
      const checkProductQuery = 'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?';
      const checkProductResult = await db.query(checkProductQuery, [cartId, productId]);
  
      if (checkProductResult.length > 0) {
        // El producto está en el carrito
        if (checkProductResult[0].quantity > 1) {
          // La cantidad del producto es mayor que 1, disminuir la cantidad
          const updateQuantityQuery = `
            UPDATE cart_items SET quantity = quantity - 1
            WHERE cart_id = ? AND product_id = ?
          `;
          await db.query(updateQuantityQuery, [cartId, productId]);
        } else {
          // La cantidad del producto es igual a 1, eliminar el producto del carrito
          const deleteProductQuery = `
            DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?
          `;
          await db.query(deleteProductQuery, [cartId, productId]);
        }
  
        console.log('Producto actualizado en el carrito correctamente');
      } else {
        throw new Error('El producto no se encuentra en el carrito');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
// models/AddProduct.js
const deleteProductFromCart = async (userId, productId) => {
    try {
      const cartId = await getCartIdByUserId(userId);
  
      const deleteProductQuery = `
        DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?
      `;
      await db.query(deleteProductQuery, [cartId, productId]);
  
      console.log('Producto eliminado del carrito correctamente');
    } catch (error) {
      console.error(error);
    }
  };
  
// models/AddProduct.js
// ...
const clearCart = async (userId) => {
    try {
      const cartId = await getCartIdByUserId(userId);
  
      const clearCartQuery = `
        DELETE FROM cart_items WHERE cart_id = ?
      `;
      await db.query(clearCartQuery, [cartId]);
  
      console.log('Carrito limpiado correctamente');
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = {
    addProduct,
    removeProduct,
    deleteProductFromCart,
    clearCart,
  };
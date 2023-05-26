// models/Cart.js
const db = require('../db');

class Cart {
    static async getCartItemsByUserId(userId) {
        try {
            const cartQuery = `
                SELECT c.id AS cart_id
                FROM carts c
                WHERE c.user_id = ?
            `;
            const cartResult = await db.query(cartQuery, [userId]);

            if (cartResult.length === 0) {
                return null;
            }

            const cartId = cartResult[0].cart_id;
            const cartItemsQuery = `
                SELECT ci.product_id, ci.quantity, p.name, p.price, p.description, p.image
                FROM cart_items ci
                JOIN products p ON ci.product_id = p.id
                WHERE ci.cart_id = ?
            `;
            const cartItemsResult = await db.query(cartItemsQuery, [cartId]);

            return cartItemsResult;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Cart;
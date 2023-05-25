// models/Cart.js
const db = require('../db');

class Cart {
    static async getCartByUserId(user_id) {
        try {
            const result = await db.query('SELECT cart_items.id as cart_item_id, cart_items.quantity as cart_item_quantity, products.id as product_id, products.name as product_name, products.price as product_price, products.image as product_image FROM cart_items INNER JOIN carts ON cart_items.cart_id = carts.id INNER JOIN products ON cart_items.product_id = products.id WHERE carts.user_id = ?;', [user_id]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async createCart(user_id) {
        try {
            const result = await db.query('INSERT INTO carts (user_id) VALUES (?)', [user_id]);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

    static async addCartItem(cart_id, product_id, quantity) {
        try {
            const result = await db.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cart_id, product_id, quantity]);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Cart;
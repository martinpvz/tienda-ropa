// models/Product.js
const db = require('../db');

class Product {
    static async getAllProducts() {
        try {
            const result = await db.query('SELECT * FROM products');
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Product;
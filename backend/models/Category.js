// models/Category.js
const db = require('../db');

class Category {
    static async getAllCategories() {
        try {
            const result = await db.query('SELECT categories.id as category_id, categories.name as category_name, categories.image as category_image, products.id as product_id, products.name as product_name, products.price as product_price, products.image as product_image FROM categories LEFT JOIN products ON categories.id = products.category_id ORDER BY categories.id;');
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Category;
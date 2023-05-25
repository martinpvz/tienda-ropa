// models/Product.js
const db = require('../db');

class singularProduct {
    static async getAllProducts() {
        try {
            const result = await db.query('SELECT * FROM products');
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getProductById(id) {
        try {
            const productQuery = `
                SELECT p.id, p.name, p.price, p.description, c.id as category_id, c.name as category_name
                FROM products p
                JOIN categories c ON p.category_id = c.id
                WHERE p.id = ?
            `;
            const galleryQuery = `
                SELECT g.id, g.ruta_imagen
                FROM galery g
                WHERE g.product_id = ?
            `;

            const productResult = await db.query(productQuery, [id]);
            const galleryResult = await db.query(galleryQuery, [id]);

            if (productResult.length === 0) {
                return null;
            }

            const product = productResult[0];
            product.images = galleryResult;

            return product;
        } catch (err) {
            throw err;
        }
    }

    static async getSimilarProducts(categoryId, excludedProductId) {
        try {
            const query = `
                SELECT * FROM products
                WHERE category_id = ? AND id != ?
                LIMIT 3
            `;

            const result = await db.query(query, [categoryId, excludedProductId]);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = singularProduct;
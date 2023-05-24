const pool = require('../db');

exports.getCategoriesWithProducts = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT categories.id as category_id, categories.name as category_name, categories.image as category_image, products.id as product_id, products.name as product_name, products.price as product_price, products.image as product_image FROM categories LEFT JOIN products ON categories.id = products.category_id ORDER BY categories.id;'
            );

        // Transformar los resultados en un objeto jerárquico
    const categories = [];
    let currentCategory = null;

    rows.forEach((row) => {
        if (!currentCategory || currentCategory.id !== row.category_id) {
            currentCategory = {
                id: row.category_id,
                name: row.category_name,
                image: row.category_image,
                products: [],
            };
            categories.push(currentCategory);
        }

        if (row.product_id) {
            currentCategory.products.push({
                id: row.product_id,
                name: row.product_name,
                price: row.product_price,
                image: row.product_image,
            });
        }
    });

    res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Algo salió mal', details: err.message });
    }
};
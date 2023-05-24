const pool = require('../db');

exports.getCartItemsByUserId = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT cart_items.id as cart_item_id, cart_items.quantity as cart_item_quantity, products.id as product_id, products.name as product_name, products.price as product_price, products.image as product_image FROM cart_items INNER JOIN carts ON cart_items.cart_id = carts.id INNER JOIN products ON cart_items.product_id = products.id WHERE carts.user_id = ?;',
            [userId]
            );

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Algo salió mal', details: err.message });
    }
};
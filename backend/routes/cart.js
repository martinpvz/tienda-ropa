// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const cartItems = await Cart.getCartItemsByUserId(userId);

        if (cartItems) {
            res.json(cartItems);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
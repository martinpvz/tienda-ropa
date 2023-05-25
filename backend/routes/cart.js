// const { Router } = require('express');
// const cartController = require('../controllers/cart');

// const router = Router();

// router.get('/:userId', cartController.getCartItemsByUserId);

// module.exports = router;




// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/:user_id', async (req, res, next) => {
    try {
        const userId = req.params.user_id;
        const cart = await Cart.getCartByUserId(userId);
        res.json(cart);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
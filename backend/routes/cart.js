const { Router } = require('express');
const cartController = require('../controllers/cart');

const router = Router();

router.get('/:userId', cartController.getCartItemsByUserId);

module.exports = router;
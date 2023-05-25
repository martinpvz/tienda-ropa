const express = require('express');
const router = express.Router();
const { addToCart } = require('../models/addCart');

router.post('/add', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'Faltan parámetros (userId y productId)' });
    }

    await addToCart(userId, productId);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
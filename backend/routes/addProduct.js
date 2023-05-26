// routes/addProduct.js
const express = require('express');
const router = express.Router();
const { addProduct, removeProduct, deleteProductFromCart, clearCart } = require('../models/AddProduct');

router.post('/add', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'Faltan parámetros (userId y productId)' });
    }

    await addProduct(userId, productId);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// routes/addProduct.js
// ...
router.post('/remove', async (req, res, next) => {
    try {
      const { userId, productId } = req.body;
  
      if (!userId || !productId) {
        return res.status(400).json({ message: 'Faltan parámetros (userId y productId)' });
      }
  
      await removeProduct(userId, productId);
      res.json({ message: 'Producto actualizado en el carrito correctamente' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  

// routes/addProduct.js
router.post('/delete', async (req, res, next) => {
    try {
      const { userId, productId } = req.body;
  
      if (!userId || !productId) {
        return res.status(400).json({ message: 'Faltan parámetros (userId y productId)' });
      }
  
      await deleteProductFromCart(userId, productId);
      res.json({ message: 'Producto eliminado del carrito correctamente' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  // ...
// routes/addProduct.js
// ...
router.post('/checkout', async (req, res, next) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: 'Falta el parámetro userId' });
      }
  
      await clearCart(userId);
      res.json({ message: 'Carrito limpiado correctamente' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  // ...
  module.exports = router;
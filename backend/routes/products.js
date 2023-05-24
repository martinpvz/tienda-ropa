// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
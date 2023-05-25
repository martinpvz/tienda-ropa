// routes/products.js
const express = require('express');
const router = express.Router();
const singularProduct = require('../models/singularProduct');

router.get('/', async (req, res, next) => {
    try {
        const products = await singularProduct.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await singularProduct.getProductById(id);
        
        if (product) {
            const similarProducts = await singularProduct.getSimilarProducts(product.category_id, id);
            res.json({ product, similarProducts });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
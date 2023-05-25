// const { Router } = require('express');
// const categoriesController = require('../controllers/categories');

// const router = Router();

// router.get('/', categoriesController.getCategoriesWithProducts);

// module.exports = router;




// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
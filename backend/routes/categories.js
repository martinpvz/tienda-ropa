const { Router } = require('express');
const categoriesController = require('../controllers/categories');

const router = Router();

router.get('/', categoriesController.getCategoriesWithProducts);

module.exports = router;
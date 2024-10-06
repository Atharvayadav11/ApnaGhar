const express = require('express');
const router = express.Router();
const ikeaController = require('../controllers/ikeaProductController');

router.get('/scrape', ikeaController.scrapeAndSaveProducts);
router.get('/products', ikeaController.getProducts);
router.get('/products/:id', ikeaController.getProductById);
router.delete('/products', ikeaController.deleteAllProducts);

module.exports = router;
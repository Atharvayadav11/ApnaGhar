const express = require('express');
const router = express.Router();
const ikeaProductController = require('../controllers/ikeaProductController');

router.post('/scrape', ikeaProductController.scrapeAndSaveProducts);
router.get('/', ikeaProductController.getProducts);

module.exports = router;
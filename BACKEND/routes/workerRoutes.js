const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

router.post('/', workerController.createWorkerProfile);
router.put('/:id', workerController.updateWorkerProfile);

module.exports = router;
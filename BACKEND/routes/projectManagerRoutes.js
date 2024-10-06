const express = require('express');
const router = express.Router();
const projectManagerController = require('../controllers/projectManagerController');

router.post('/', projectManagerController.createProjectManagerProfile);
router.put('/:id', projectManagerController.updateProjectManagerProfile);

module.exports = router;

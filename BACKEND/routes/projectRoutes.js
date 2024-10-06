const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');

router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);

module.exports = router;
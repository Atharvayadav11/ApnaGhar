const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUserProfile);
router.put('/:id', userController.updateUserProfile);

module.exports = router;

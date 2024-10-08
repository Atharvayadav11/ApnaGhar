const express = require('express');
const { createTasks, deleteTask, getTasks, updateTask } = require('../controllers/task.controller');

const router = express.Router();

router.get('/', getTasks);
router.post('/create', createTasks);
router.patch('/updateTask', updateTask);
router.delete('/deleteTask', deleteTask);

module.exports = router;

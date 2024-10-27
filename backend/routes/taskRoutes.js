// routes/taskRoutes.js
const express = require('express');
const { createTasks, deleteTask, getTasks, updateTask, getTaskCounts } = require('../controllers/task.controller');

const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/:id', getTasks);
router.get('/count/:id', getTaskCounts);
router.post('/create', createTasks);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
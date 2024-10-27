// controllers/taskController.js
const TaskModel = require("../models/Tasks.js");

exports.getTasks = async function (req, res) {
    try {
        const tasks = await TaskModel.find();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: "Server error while fetching tasks" });
    }
};

exports.createTasks = async function (req, res) {
    try {
        const { title, description, deadline, status, worker_name } = req.body;
        const newTask = await TaskModel.create({ 
            title, 
            description, 
            deadline, 
            status, 
            worker_name 
        });
        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async function (req, res) {
    try {
        const { taskId } = req.params;
        const updateData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ error: "Server error while updating task" });
    }
};

exports.deleteTask = async function (req, res) {
    try {
        const { taskId } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server error while deleting task" });
    }
};
const { default: mongoose } = require("mongoose");
const TaskModel  = require("../models/Tasks.js");

exports.getTasks = async function (req, res) {
    try {
        console.log("Fetching tasks");
        
        const project_id  = req.params.id
        console.log(project_id);
        
        const all_projects = await TaskModel.find({project_id: new mongoose.Types.ObjectId(project_id)});
        console.log(all_projects);
        
        return res.status(200).json(all_projects);
    } catch (error) {
        return res.status(500).json({ error: "Server error while fetching tasks" });
    }
};

exports.getTaskCounts = async function (req, res) {
    try {
        console.log("Fetching task counts");

        const project_id = req.params.id;
        console.log("Project ID:", project_id);

        // Count tasks based on status
        const totalTasks = await TaskModel.countDocuments({ project_id: new mongoose.Types.ObjectId(project_id) });
        const pendingTasks = await TaskModel.countDocuments({ project_id: new mongoose.Types.ObjectId(project_id), status: "pending" });
        const completedTasks = await TaskModel.countDocuments({ project_id: new mongoose.Types.ObjectId(project_id), status: "completed" });

        const taskCounts = {
            total: totalTasks,
            pending: pendingTasks,
            completed: completedTasks,
        };

        return res.status(200).json(taskCounts);
    } catch (error) {
        console.error("Error fetching task counts:", error);
        return res.status(500).json({ error: "Server error while fetching task counts" });
    }
};

exports.createTasks = async function (req, res) {
    try {
        const { title, description, deadline, status, worker_name, project_id } = req.body;
        console.log("Hello");
         
        const newTask = await TaskModel.create({ title, description, deadline, status, worker_name,project_id: new mongoose.Types.ObjectId(project_id) });
        console.log(newTask);
        
        return res.status(200).json(newTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async function (req, res) {
    try {
        console.log("Hello");
        
        const { taskId } = req.params; // Get task ID from URL params
        const { title, description, deadline, status, worker_name } = req.body; // Fields to update

        const worker = await TaskModel.findOne({ name: worker_name }); // Find the worker by name
        if (!worker) {
            return res.status(404).json({ error: "Worker not found" });
        }

        // Update the task with the provided fields
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
        console.log(error);
        
        return res.status(500).json({ error: "Server error while updating task" });
    }
};

exports.deleteTask = async function (req, res) {
    try {
        const { taskId } = req.params;
        console.log("Deleting Task..");
        
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server error while deleting task" });
    }
};
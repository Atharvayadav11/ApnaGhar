const TaskModel  = require("../models/Tasks.js");

exports.getTasks = async function (req, res) {
    try {
        const { project_id } = req;
        const all_projects = await TaskModel.find({ project_id });

        return res.status(200).json(all_projects);
    } catch (error) {
        return res.status(500).json({ error: "Server error while fetching tasks" });
    }
};

exports.createTasks = async function (req, res) {
    try {
        const { title, description, deadline, status, worker_name, project_id } = req.body;
        console.log("Hello");
         
        const newTask = await TaskModel.create({ title, description, deadline, status, worker_name });
        console.log(newTask);
        
        return res.status(200).json(newTask);
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: error });
    }
};

exports.updateTask = async function (req, res) {
    try {
        const { taskId } = req.params; // Get task ID from URL params
        const { title, description, deadline, status, worker_name } = req.body; // Fields to update

        const worker = await Worker.findOne({ name: worker_name }); // Find the worker by name
        if (!worker) {
            return res.status(404).json({ error: "Worker not found" });
        }

        // Update the task with the provided fields
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            { title, description, deadline, status, worker_id: worker._id },
            { new: true } // Option to return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(updatedTask); // Return the updated task
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

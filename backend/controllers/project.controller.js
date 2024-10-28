const Project = require("../models/Project.js"); // Ensure you're importing the model correctly

// const Project = require('../models/Project'); // Ensure the path to your model is correct

exports.addProject = async function (req, res) {
  try {
    console.log("Helllll");
    
    const {
        project_name,
        customer_name,
        workers,
        deadline,
        budget: {
            flooring,
            plumbing,
            wiring,
            painting,
            furniture
        }
    } = req.body;
    console.log(plumbing);
    
    // Calculate total budget
    const total = flooring + plumbing + wiring + painting + furniture;

    // Create new project instance
    const newProject = new Project({
        project_name,
        customer_name,
        workers: workers || [], // Default to empty array if not provided
        deadline,
        budget: {
            flooring,
            plumbing,
            wiring,
            painting,
            furniture,
            total
        },
        budget_spent: 0 // Initialize budget_spent to 0
    });

    // Save the project
    const savedProject = await newProject.save();
    console.log(savedProject);
    

    // Send success response
    res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: savedProject
    });

} catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: Object.values(error.errors).map(err => err.message)
        });
    }

    // Handle other errors
    console.error("Error in addProject:", error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
    });
}
};


exports.getProject = async function (req, res) {
  try {
    console.log("Helllii");
    
    const id = req.params.id;
    const project = await Project.findById(id);
    console.log("Projet",project);
    
    return res.status(200).json(project)
    
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "Server error while fetching project" });
  }
};
exports.getProjects = async function (req, res) {
  try {
    console.log("Hi");
    
    const projects = await Project.find({});
    console.log(projects);
    
    return res.status(200).json(projects)
    
  } catch (error) {
    return res.status(500).json({ error: "Server error while fetching projects" });
  }
};


exports.deleteProject = async function (req, res) {
  try {
    var id = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(200).json({ message: "Project deleted successfully" });
   
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "Server error while deleting project" });
  }
};

exports.toggleWorker = function (req, res) {
  try {
    var id = req.params.id;
    var worker_name = req.body.worker_name;

    Project.findById(id, function (error, project) {
      if (error) {
        return res.status(500).json({ error: "Server error while toggling worker" });
      }
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (project.workers.includes(worker_name)) {
        project.workers = project.workers.filter(function (worker) {
          return worker !== worker_name;
        });
      } else {
        project.workers.push(worker_name);
      }

      project.save(function (error) {
        if (error) {
          return res.status(500).json({ error: "Server error while toggling worker" });
        }
        return res.status(200).json({ message: "Worker toggled", project: project });
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error while toggling worker" });
  }
};

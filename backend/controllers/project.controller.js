const Project = require("../models/Project.js"); // Ensure you're importing the model correctly

exports.addProject = async function (req, res) {
  try {
    console.log("Hello");
    
    // Destructure the request body for cleaner code
    const { project_name, customer_name, workers = [], budget, deadline } = req.body;

    // Pass an object to the create method
    const project = await Project.create({
      project_name,
      customer_name,
      workers,
      budget,
      deadline
    });

    console.log(project);
    
    return res.status(200).json(project);

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "Server error while adding project" });
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

exports.deleteProject = function (req, res) {
  try {
    var id = req.params.id;
    Project.findByIdAndDelete(id, function (error, deletedProject) {
      if (error) {
        return res.status(500).json({ error: "Server error while deleting project" });
      }
      if (!deletedProject) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(200).json({ message: "Project deleted successfully" });
    });
  } catch (error) {
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

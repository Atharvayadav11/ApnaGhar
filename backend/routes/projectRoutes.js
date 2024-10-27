var express = require("express");
var projectController = require("../controllers/project.controller.js");

var router = express.Router();

// Add a new project
router.post("/", projectController.addProject);

// Get all projects
router.get("/", projectController.getProjects);

router.get("/:id", projectController.getProject);

// Delete a project by id
router.delete("/:id", projectController.deleteProject);

// Toggle project status by id
// router.patch("/:id/toggle-status", projectController.toggleStatus);

module.exports = router;

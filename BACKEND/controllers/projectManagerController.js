const ProjectManager = require('../models/ProjectManager');

exports.createProjectManagerProfile = async (req, res) => {
  try {
    const newProjectManager = new ProjectManager(req.body);
    await newProjectManager.save();
    res.status(201).json(newProjectManager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProjectManagerProfile = async (req, res) => {
  try {
    const updatedProjectManager = await ProjectManager.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProjectManager) return res.status(404).json({ message: 'Project Manager not found' });
    res.json(updatedProjectManager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
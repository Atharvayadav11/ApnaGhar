const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  title: { type: String, required: true },
  typeOfMarble: { type: String },
  typeOfPaint: { type: String },
  extraServices: [{ type: String }],
  duration: { type: Number, required: true },
  startDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectManager', required: true }
});

module.exports = mongoose.model('Project', projectSchema);
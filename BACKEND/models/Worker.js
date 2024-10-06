const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  workExp: { type: Number },
  expertise: [{ type: String }],
  prevContractor: { type: String }
});

module.exports = mongoose.model('Worker', workerSchema);
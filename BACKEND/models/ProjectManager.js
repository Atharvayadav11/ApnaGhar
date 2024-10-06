const mongoose = require('mongoose');

const projectManagerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  authId: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  servicesProvided: [{ type: String }],
  expertise: [{ type: String }],
  portfolio: [{ type: String }],
  teamDescription: { type: String }
});

module.exports = mongoose.model('ProjectManager', projectManagerSchema);

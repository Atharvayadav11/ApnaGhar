const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  authId: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  description: { type: String },
  address: { type: String },
  lookingFor: { type: String }
});

module.exports = mongoose.model('User', userSchema);
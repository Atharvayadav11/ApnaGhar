const mongoose = require('mongoose');

const ikeaProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  productUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('IkeaProduct', ikeaProductSchema);
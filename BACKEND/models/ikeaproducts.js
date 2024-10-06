const mongoose = require('mongoose');

const ikeaProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  productUrl: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('IkeaProduct', ikeaProductSchema);
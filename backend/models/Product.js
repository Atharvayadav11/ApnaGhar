const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      ref: "Customer",
      required: true,
    },
    taskname: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    date: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    assignedTo: {
      type: String,
    },
    // Uncomment if you want to track progress
    // progress: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
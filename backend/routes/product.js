const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const twilio = require("twilio");

// Twilio configuration
const accountSid = 'ACfec0000147003bd1c3d833be3333254c';
const authToken = '7f10396dfc57d2bb66b64cd05d2db685';
const client = new twilio(accountSid, authToken);

// Create product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Check if the status is set to "completed"
    if (req.body.status === "completed") {
      // Send SMS message
      client.messages
        .create({
          body: `Your task ${updatedProduct.taskname} assigned to ${updatedProduct.assignedTo} dated ${updatedProduct.date} has been completed successfully.`,
          from: '+18433105469',
          to: '+919321543686'
        })
        .then(message => console.log('SMS sent:', message.sid))
        .catch(err => console.error('Error sending SMS:', err));
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get products by customer id
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.find({ id: req.params.id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const { Server } = require("socket.io"); // Removed Socket.io
var http = require('http');


const app = express();
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const paintRoutes = require("./routes/paint.js");
const custRoute = require("./routes/customer.js");
const Paint = require("./models/Paint.js");

dotenv.config();
app.use(express.json());
app.use(cors());

/* MONGOOSE SETUP */
const PORT = 5001 || 9000;
mongoose
  .connect(
    "mongodb+srv://atharvayadav11:ashokvaishali@cluster0.twnwnbu.mongodb.net/ApnaGharTest?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/customer", custRoute);
app.use("/paint", paintRoutes);

app.use('/getPaints', async (req, res) => {
  const result = await Paint.find();
  res.status(200).send(result);
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "45285d81-23fa-4202-8493-ad0a16cec1ab" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response) {
      // If e.response exists, send the status and data
      return res.status(e.response.status).json(e.response.data);
    } else {
      // If e.response is undefined, send a generic error status
      return res.status(500).json({ message: "An error occurred", error: e.message });
    }
  }
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

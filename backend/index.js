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
const projectRoutes = require("./routes/projectRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const Paint = require("./models/Paint.js");
const scrapeIkeaCategory  = require("./utils/scrapper.js");

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

app.use("/projects",projectRoutes)
app.use("/tasks",taskRoutes)

app.get('/scrape/:category', async (req, res) => {
  const { category } = req.params;
  const chairs = await scrapeIkeaCategory(category);

  if (chairs.length > 0) {
    console.log(JSON.stringify(chairs, null, 2));
    return res.status(200).json(chairs); 
  } else {
    console.log('No chairs found or an error occurred');
    return res.status(404).json({ message: 'No chairs found or an error occurred' });
  }
});

// (async function() {
//   console.log("Hello");
  
//   const chairs = await scrapeIkeaCategory('chairs');
//   if (chairs.length > 0) {
//       console.log(JSON.stringify(chairs, null, 2));
//   } else {
//       console.log('No chairs found or an error occurred');
//     }
// })();
// app.use("/api/cart", cartRoute);
// app.use("/api/order", orderRoute);


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

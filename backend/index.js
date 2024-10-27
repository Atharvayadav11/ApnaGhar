const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const paintRoutes = require("./routes/paint.js");
const custRoute = require("./routes/customer.js");
const projectRoutes = require("./routes/projectRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const Paint = require("./models/Paint.js");
const scrapeIkeaCategory = require('./utils/scrapper.js')

dotenv.config();
app.use(express.json());
app.use(cors());

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;

// Routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/customer", custRoute);
app.use("/paint", paintRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);  // This matches the frontend API calls to /tasks

app.get('/getPaints', async (req, res) => {
  const result = await Paint.find();
  res.status(200).send(result);
});

app.get('/scrape/:category', async (req, res) => {
  console.log("hello");
  
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

// Remove the authenticate endpoint if not needed

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
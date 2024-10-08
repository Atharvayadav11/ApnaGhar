const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
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
// const cartRoute = require("./routes/cart.js");
// const orderRoute = require("./routes/order.js");
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

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/customer", custRoute);
app.use("/projects",projectRoutes)
app.use("/tasks",taskRoutes)
// app.use("/api/cart", cartRoute);
// app.use("/api/order", orderRoute);

app.use('/paint', paintRoutes);
app.use('/getPaints', async (req, res) => {
  const result = await Paint.find();
  res.status(200).send(result);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(` User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with Id: ${socket.id} has joined the room ${data}`)
  });

  socket.on("send_message", (data)=>{
    socket.to(data.room).emit("receive_message", data);
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5002, () => {
  console.log("SERVER CHALU HAI BHAI");
});

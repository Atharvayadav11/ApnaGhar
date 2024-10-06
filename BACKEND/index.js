const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const projectManagerRoutes = require('./routes/projectManagerRoutes');
const workerRoutes = require('./routes/workerRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://atharvayadav11:ashokvaishali@cluster0.twnwnbu.mongodb.net/NFCDatabase?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/project-managers', projectManagerRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/projects', projectRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
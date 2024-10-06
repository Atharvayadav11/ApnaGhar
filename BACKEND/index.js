const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const projectManagerRoutes = require('./routes/projectManagerRoutes');
const workerRoutes = require('./routes/workerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cron = require('node-cron');
const ikeaProductRoutes = require('./routes/ikeaProductsRoutes');
const ikeaProductController = require('./controllers/ikeaProductController');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://atharvayadav11:ashokvaishali@cluster0.twnwnbu.mongodb.net/ApnaGhar?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/project-managers', projectManagerRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/projects', projectRoutes);

//ikeastuff
app.use('/api/marketplace', ikeaProductRoutes);
// Set up cron job to scrape IKEA products every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily IKEA product scrape');
  await ikeaProductController.scrapeAndSaveProducts();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
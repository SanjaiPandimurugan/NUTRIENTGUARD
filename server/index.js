const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const sensorRoutes = require(path.join(__dirname, 'routes', 'sensors'));
const predictionRoutes = require(path.join(__dirname, 'routes', 'predictions'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sensor_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/sensors', sensorRoutes);
app.use('/api/predictions', predictionRoutes);

const PORT = process.env.PORT || 5001;  // Changed to 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
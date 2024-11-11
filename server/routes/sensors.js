const express = require('express');
const router = express.Router();
const SensorReading = require('../models/SensorReading');

// Generate random value within range
const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Route to get latest sensor data
router.get('/latest', async (req, res) => {
  try {
    // Generate mock sensor data
    const currentReading = {
      nitrogen: getRandomValue(20, 40),
      phosphorus: getRandomValue(10, 20),
      potassium: getRandomValue(15, 30),
      ph: getRandomValue(6.0, 7.5),
      calcium: getRandomValue(1000, 2000)
    };

    // Save to database
    const newReading = new SensorReading(currentReading);
    await newReading.save();

    res.json(currentReading);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

module.exports = router;
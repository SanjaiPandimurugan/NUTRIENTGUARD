const express = require('express');
const router = express.Router();
const SensorReading = require('../models/SensorReading');

// Test route to add sample data
router.post('/add-sample', async (req, res) => {
  try {
    const sampleReading = new SensorReading({
      nitrogen: 35,
      phosphorus: 20,
      potassium: 180,
      ph: 6.5,
      calcium: 1400
    });

    await sampleReading.save();
    res.json({ message: 'Sample data added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all readings
router.get('/readings', async (req, res) => {
  try {
    const readings = await SensorReading.find().sort({ timestamp: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
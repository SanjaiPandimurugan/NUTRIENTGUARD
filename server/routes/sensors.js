const express = require('express');
const router = express.Router();
const SensorReading = require('../models/SensorReading');

// Add new reading
router.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const reading = new SensorReading({
      nitrogen: req.body.nitrogen,
      phosphorus: req.body.phosphorus,
      potassium: req.body.potassium,
      ph: req.body.ph,
      calcium: req.body.calcium,
      timestamp: new Date()
    });

    const savedReading = await reading.save();
    console.log('Saved reading:', savedReading);
    res.status(201).json(savedReading);
  } catch (error) {
    console.error('Error saving reading:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all readings
router.get('/', async (req, res) => {
  try {
    const readings = await SensorReading.find()
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const count = await SensorReading.countDocuments();
    const latestReading = await SensorReading.findOne().sort({ timestamp: -1 });
    
    res.json({
      documentCount: count,
      latestReading
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cleanup old data (optional)
const cleanupOldData = async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    await SensorReading.deleteMany({
      timestamp: { $lt: oneHourAgo }
    });
  } catch (error) {
    console.error('Error cleaning up old data:', error);
  }
};

// Run cleanup every hour
setInterval(cleanupOldData, 60 * 60 * 1000);

module.exports = router;
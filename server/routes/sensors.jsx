const express = require('express');
const router = express.Router();
const SensorReading = require('../models/SensorReading');

// Generate random sensor value within range
const generateSensorValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Get sensor status
const getSensorStatus = (value, min, max) => {
  if (value < min) return 'Low';
  if (value > max) return 'High';
  return 'Normal';
};

// Route to get latest sensor readings
router.get('/latest', async (req, res) => {
  try {
    // Generate mock readings for each sensor
    const sensors = [
      { id: 'nitrogen', name: 'Nitrogen', min: 20, max: 40, unit: 'mg/kg' },
      { id: 'phosphorus', name: 'Phosphorus', min: 10, max: 20, unit: 'mg/kg' },
      { id: 'potassium', name: 'Potassium', min: 15, max: 30, unit: 'mg/kg' },
      { id: 'ph', name: 'pH', min: 6.0, max: 7.5, unit: 'pH' },
      { id: 'calcium', name: 'Calcium', min: 1000, max: 2000, unit: 'mg/kg' }
    ];

    const readings = sensors.map(sensor => {
      const value = generateSensorValue(sensor.min, sensor.max);
      return new SensorReading({
        sensorId: sensor.id,
        sensorName: sensor.name,
        value: value,
        unit: sensor.unit,
        status: getSensorStatus(value, sensor.min, sensor.max),
        minValue: sensor.min,
        maxValue: sensor.max
      });
    });

    // Save readings to database
    await SensorReading.insertMany(readings);

    // Get historical data for each sensor (last 20 readings)
    const historicalData = {};
    for (const sensor of sensors) {
      const history = await SensorReading.find({ sensorId: sensor.id })
        .sort({ timestamp: -1 })
        .limit(20);
      historicalData[sensor.id] = history;
    }

    res.json({
      current: readings,
      historical: historicalData
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

module.exports = router;
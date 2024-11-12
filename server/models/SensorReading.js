const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
  nitrogen: {
    type: Number,
    required: true,
    min: 0
  },
  phosphorus: {
    type: Number,
    required: true,
    min: 0
  },
  potassium: {
    type: Number,
    required: true,
    min: 0
  },
  ph: {
    type: Number,
    required: true,
    min: 0,
    max: 14
  },
  calcium: {
    type: Number,
    required: true,
    min: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better performance
sensorReadingSchema.index({ timestamp: -1 });

const SensorReading = mongoose.model('SensorReading', sensorReadingSchema, 'sensorreadings');
module.exports = SensorReading;
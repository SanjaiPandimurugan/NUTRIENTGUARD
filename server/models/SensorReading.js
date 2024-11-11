const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
  ph: Number,
  calcium: Number
});

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
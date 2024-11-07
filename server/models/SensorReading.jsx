const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  sensorId: String,
  sensorName: String,
  value: Number,
  unit: String,
  status: String,
  minValue: Number,
  maxValue: Number
});

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
const express = require('express');
const router = express.Router();

// Mock ML predictions
router.post('/manure', (req, res) => {
  const { currentLevels } = req.body;
  
  // Simple mock calculation based on nitrogen levels
  const baseValue = currentLevels.nitrogen;
  
  // Generate mock recommendations
  const recommendations = {
    cattle: baseValue * 2.5,
    poultry: baseValue * 1.8,
    organic: baseValue * 3.2
  };

  res.json(recommendations);
});

module.exports = router;
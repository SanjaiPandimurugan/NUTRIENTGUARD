const express = require('express');
const router = express.Router();

router.post('/manure', (req, res) => {
  try {
    const { current } = req.body;

    // Mock predictions
    const predictions = {
      organic: {
        prediction: 25.5,
        importance: {
          Nitrogen: 0.3,
          Phosphorous: 0.2,
          Potassium: 0.2,
          pH: 0.15,
          Calcium: 0.15
        }
      },
      cattle: {
        prediction: 30.2,
        importance: {
          Nitrogen: 0.25,
          Phosphorous: 0.25,
          Potassium: 0.2,
          pH: 0.15,
          Calcium: 0.15
        }
      },
      poultry: {
        prediction: 20.1,
        importance: {
          Nitrogen: 0.35,
          Phosphorous: 0.2,
          Potassium: 0.15,
          pH: 0.15,
          Calcium: 0.15
        }
      }
    };

    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate predictions' });
  }
});

module.exports = router;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './dashboard/Header';
import SensorGrid from './dashboard/SensorGrid';
import NutrientChart from './dashboard/NutrientChart';
import ManureRecommendations from './dashboard/ManureRecommendations';

const NutrientDashboard = () => {
  // Define optimal ranges for each nutrient
  const nutrientRanges = {
    nitrogen: { min: 35, optimal: 40, max: 45 },
    phosphorus: { min: 20, optimal: 25, max: 30 },
    potassium: { min: 180, optimal: 200, max: 220 },
    ph: { min: 6.5, optimal: 6.8, max: 7.0 },
    calcium: { min: 1400, optimal: 1500, max: 1600 }
  };

  // States
  const [sensorData, setSensorData] = useState({
    nitrogen: { value: 0, data: [] },
    phosphorus: { value: 0, data: [] },
    potassium: { value: 0, data: [] },
    ph: { value: 0, data: [] },
    calcium: { value: 0, data: [] }
  });

  const [manureRecommendations, setManureRecommendations] = useState({
    cattle: 1200,
    poultry: 900,
    organic: 1000
  });

  const [isLoading, setIsLoading] = useState(false);
  const [combinedChartData, setCombinedChartData] = useState([]);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [timeRange, setTimeRange] = useState('1h');
  const [systemStatus, setSystemStatus] = useState('optimal');

  // Generate random reading within ranges
  const generateRandomReading = () => ({
    nitrogen: parseFloat((Math.random() * (nutrientRanges.nitrogen.max - nutrientRanges.nitrogen.min) + nutrientRanges.nitrogen.min).toFixed(2)),
    phosphorus: parseFloat((Math.random() * (nutrientRanges.phosphorus.max - nutrientRanges.phosphorus.min) + nutrientRanges.phosphorus.min).toFixed(2)),
    potassium: parseFloat((Math.random() * (nutrientRanges.potassium.max - nutrientRanges.potassium.min) + nutrientRanges.potassium.min).toFixed(2)),
    ph: parseFloat((Math.random() * (nutrientRanges.ph.max - nutrientRanges.ph.min) + nutrientRanges.ph.min).toFixed(2)),
    calcium: parseFloat((Math.random() * (nutrientRanges.calcium.max - nutrientRanges.calcium.min) + nutrientRanges.calcium.min).toFixed(2))
  });

  // Update sensor cards with random values
  // Update sensor cards with random values
const updateSensorCardsWithRandomValues = () => {
  setIsLoading(true);
  const randomReading = generateRandomReading();
  const timestamp = new Date().toLocaleTimeString();
  setLastUpdateTime(new Date());

  setSensorData(prevData => {
    const newData = {
      nitrogen: {
        ...prevData.nitrogen,
        value: randomReading.nitrogen,
        data: [...(prevData.nitrogen.data || []), {
          timestamp,
          nitrogen: randomReading.nitrogen,
          optimal: nutrientRanges.nitrogen.optimal
        }].slice(-20)
      },
      phosphorus: {
        ...prevData.phosphorus,
        value: randomReading.phosphorus,
        data: [...(prevData.phosphorus.data || []), {
          timestamp,
          phosphorus: randomReading.phosphorus,
          optimal: nutrientRanges.phosphorus.optimal
        }].slice(-20)
      },
      potassium: {
        ...prevData.potassium,
        value: randomReading.potassium,
        data: [...(prevData.potassium.data || []), {
          timestamp,
          potassium: randomReading.potassium,
          optimal: nutrientRanges.potassium.optimal
        }].slice(-20)
      },
      ph: {
        ...prevData.ph,
        value: randomReading.ph,
        data: [...(prevData.ph.data || []), {
          timestamp,
          ph: randomReading.ph,
          optimal: nutrientRanges.ph.optimal
        }].slice(-20)
      },
      calcium: {
        ...prevData.calcium,
        value: randomReading.calcium,
        data: [...(prevData.calcium.data || []), {
          timestamp,
          calcium: randomReading.calcium,
          optimal: nutrientRanges.calcium.optimal
        }].slice(-20)
      }
    };

    // Update combined chart data
    setCombinedChartData(prev => [...prev, {
      timestamp,
      ...randomReading
    }].slice(-20));

    return newData;
  });

  setIsLoading(false);
  return randomReading;
};

  // Update recommendations based on nutrient levels
  const updateManureRecommendations = (currentLevels) => {
    const calculateRecommendation = (current, optimal) => {
      const deficit = optimal - current;
      return Math.max(0, deficit * 50);
    };

    setManureRecommendations({
      cattle: Math.round(1000 + calculateRecommendation(currentLevels.nitrogen, nutrientRanges.nitrogen.optimal)),
      poultry: Math.round(800 + calculateRecommendation(currentLevels.phosphorus, nutrientRanges.phosphorus.optimal)),
      organic: Math.round(900 + calculateRecommendation(currentLevels.potassium, nutrientRanges.potassium.optimal))
    });
  };

  // Add test data and store in MongoDB
  const addTestData = async () => {
    try {
      const randomReading = updateSensorCardsWithRandomValues();
      const response = await axios.post('http://localhost:5000/api/sensors', randomReading);
      console.log('Stored in MongoDB:', response.data);
      updateManureRecommendations(randomReading);
    } catch (error) {
      console.error('Error adding test data:', error);
      setSystemStatus('error');
    }
  };

  // Handle data export
  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      combinedChartData.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nutrient_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Initialize data and set up interval
  useEffect(() => {
    addTestData();
    const interval = setInterval(addTestData, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header 
          lastUpdateTime={lastUpdateTime}
          systemStatus={systemStatus}
        />
        <SensorGrid 
          sensorData={sensorData}
          nutrientRanges={nutrientRanges}
          isLoading={isLoading}
        />
     <NutrientChart 
  combinedChartData={combinedChartData}
  timeRange={timeRange}
  setTimeRange={setTimeRange}
  handleExportData={handleExportData}
  nutrientRanges={nutrientRanges}
/>
        <ManureRecommendations 
          manureRecommendations={manureRecommendations}
          handleExportData={handleExportData}
        />
      </div>
    </div>
  );
};

export default NutrientDashboard;
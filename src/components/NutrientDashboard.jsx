import React, { useState, useEffect } from 'react';
import SensorCard from './SensorCard';
import { Droplet, Leaf, Zap, ThermometerSun, Atom, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

const NutrientDashboard = () => {
  // Define optimal ranges for each nutrient with narrower ranges
  const nutrientRanges = {
    nitrogen: { 
      min: 35, 
      optimal: 40, 
      max: 45  
    },
    phosphorus: { 
      min: 20, 
      optimal: 25, 
      max: 30 
    },
    potassium: { 
      min: 180, 
      optimal: 200, 
      max: 220 
    },
    ph: { 
      min: 6.5, 
      optimal: 6.8, 
      max: 7.0 
    },
    calcium: { 
      min: 1400, 
      optimal: 1500, 
      max: 1600 
    }
  };

  const [sensorData, setSensorData] = useState({
    nitrogen: { value: 0, data: [] },
    phosphorus: { value: 0, data: [] },
    potassium: { value: 0, data: [] },
    ph: { value: 0, data: [] },
    calcium: { value: 0, data: [] },
  });

  const [manureRecommendations, setManureRecommendations] = useState({
    cattle: 1200,
    poultry: 900,
    organic: 1000
  });

  const [timeFilter, setTimeFilter] = useState('live');

  // Generate realistic random value within optimal range
  const generateRealisticValue = (nutrient) => {
    const range = nutrientRanges[nutrient];
    const variance = (range.max - range.min) * 0.1; // 10% variance
    return range.optimal + (Math.random() * variance * 2 - variance);
  };

  // Update recommendations based on nutrient levels
  const updateManureRecommendations = (currentLevels) => {
    const calculateRecommendation = (current, optimal) => {
      const deficit = optimal - current;
      return Math.max(0, deficit * 50);
    };

    setManureRecommendations({
      cattle: 1000 + calculateRecommendation(currentLevels.nitrogen, nutrientRanges.nitrogen.optimal),
      poultry: 800 + calculateRecommendation(currentLevels.phosphorus, nutrientRanges.phosphorus.optimal),
      organic: 900 + calculateRecommendation(currentLevels.potassium, nutrientRanges.potassium.optimal)
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      
      setSensorData(prevData => {
        const newData = { ...prevData };
        const currentLevels = {};

        Object.keys(newData).forEach(key => {
          const newValue = generateRealisticValue(key);
          currentLevels[key] = newValue;
          
          newData[key] = {
            value: newValue,
            data: [...prevData[key].data, {
              timestamp: new Date(currentTime).toLocaleTimeString(),
              [key]: newValue,
              optimal: nutrientRanges[key].optimal
            }].slice(-20)
          };
        });

        updateManureRecommendations(currentLevels);
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Soil Nutrient Monitor</h1>
        <p className="text-gray-600">Real-time monitoring of your soil's nutrient levels</p>
      </div>

      {/* Status Banner */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex items-center justify-between border border-gray-100">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700 font-medium">Monitoring Active</span>
        </div>
        <span className="text-gray-600">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <SensorCard
          title="Nitrogen (N)"
          value={sensorData.nitrogen.value}
          unit="mg/kg"
          icon={<Leaf className="w-6 h-6" />}
          color="emerald"
          data={sensorData.nitrogen.data}
          range={nutrientRanges.nitrogen}
        />
        <SensorCard
          title="Phosphorus (P)"
          value={sensorData.phosphorus.value}
          unit="mg/kg"
          icon={<Droplet className="w-6 h-6" />}
          color="blue"
          data={sensorData.phosphorus.data}
          range={nutrientRanges.phosphorus}
        />
        <SensorCard
          title="Potassium (K)"
          value={sensorData.potassium.value}
          unit="mg/kg"
          icon={<Zap className="w-6 h-6" />}
          color="amber"
          data={sensorData.potassium.data}
          range={nutrientRanges.potassium}
        />
        <SensorCard
          title="pH Level"
          value={sensorData.ph.value}
          unit=""
          icon={<ThermometerSun className="w-6 h-6" />}
          color="rose"
          data={sensorData.ph.data}
          range={nutrientRanges.ph}
        />
        <SensorCard
          title="Calcium (Ca)"
          value={sensorData.calcium.value}
          unit="mg/kg"
          icon={<Atom className="w-6 h-6" />}
          color="orange"
          data={sensorData.calcium.data}
          range={nutrientRanges.calcium}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-8">
        {/* Enhanced Graph Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Nutrient Trends</h2>
                <p className="text-gray-600">Green area shows optimal nutrient range</p>
              </div>
            </div>

            {/* Time Controls */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTimeFilter('now')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${timeFilter === 'now' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
              >
                Current
              </button>
              <button
                onClick={() => setTimeFilter('live')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${timeFilter === 'live' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
              >
                Live View
              </button>
            </div>
          </div>

          {/* Graph Container */}
          <div className="h-[450px] p-4 bg-gray-50 rounded-xl border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="healthyRange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#BBF7D0" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#BBF7D0" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                
                {/* Optimal Range Indicators */}
                <ReferenceArea
                  y1={nutrientRanges.nitrogen.min}
                  y2={nutrientRanges.nitrogen.max}
                  fill="url(#healthyRange)"
                  label={{ 
                    value: 'Optimal Range', 
                    position: 'insideTopRight',
                    fill: '#047857',
                    fontSize: 14
                  }}
                />

                <XAxis 
                  dataKey="timestamp"
                  tick={{ fill: '#374151', fontSize: 14 }}
                  tickLine={{ stroke: '#9CA3AF' }}
                  stroke="#9CA3AF"
                />
                
                <YAxis 
                  tick={{ fill: '#374151', fontSize: 14 }}
                  tickLine={{ stroke: '#9CA3AF' }}
                  stroke="#9CA3AF"
                  label={{ 
                    value: 'Nutrient Level (mg/kg)', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: '#374151',
                    fontSize: 16,
                    offset: 10
                  }}
                />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                          <p className="font-bold text-gray-800 mb-2">Time: {label}</p>
                          {payload.map((entry, index) => {
                            const nutrientName = entry.name.toLowerCase().split(' ')[0];
                            const range = nutrientRanges[nutrientName];
                            const isOptimal = entry.value >= range.min && entry.value <= range.max;

                            return (
                              <div key={index} className="flex items-center justify-between py-1">
                                <div className="flex items-center space-x-2">
                                  <div 
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                  />
                                  <span className="font-medium">{entry.name}:</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span>{entry.value.toFixed(1)} mg/kg</span>
                                  <span className={`font-medium ${isOptimal ? 'text-green-600' : 'text-gray-600'}`}>
                                    {isOptimal ? '(Optimal)' : `(Target: ${range.optimal})`}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend 
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={12}
                  wrapperStyle={{
                    paddingBottom: '20px',
                    fontSize: '14px'
                  }}
                />

                {/* Nutrient Lines */}
                <Line 
                  data={sensorData.nitrogen.data}
                  type="monotone"
                  dataKey="nitrogen"
                  stroke="#047857"
                  strokeWidth={3}
                  dot={{ fill: '#047857', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Nitrogen (N)"
                />
                <Line 
                  data={sensorData.phosphorus.data}
                  type="monotone"
                  dataKey="phosphorus"
                  stroke="#1D4ED8"
                  strokeWidth={3}
                  dot={{ fill: '#1D4ED8', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Phosphorus (P)"
                />
                <Line 
                  data={sensorData.potassium.data}
                  type="monotone"
                  dataKey="potassium"
                  stroke="#B45309"
                  strokeWidth={3}
                  dot={{ fill: '#B45309', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Potassium (K)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recommended Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Object.entries(manureRecommendations).map(([type, amount]) => (
              <div 
                key={type}
                className="bg-gray-50 rounded-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-2 capitalize">
                  {type} Manure
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {amount.toFixed(1)}
                </p>
                <p className="text-sm text-gray-600 mt-1">kg per hectare needed</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> These recommendations are based on current soil nutrient levels.
              Actual needs may vary based on your soil type and crop requirements.
              For best results, consult with your local agricultural expert.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutrientDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SensorCard from './SensorCard';
import { 
  Droplet, 
  Leaf, 
  Zap, 
  ThermometerSun, 
  Atom, 
  Download, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const NutrientDashboard = () => {
  // Define optimal ranges for each nutrient
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
          data: [...prevData.nitrogen.data, {
            timestamp,
            nitrogen: randomReading.nitrogen,
            optimal: nutrientRanges.nitrogen.optimal
          }].slice(-20)
        },
        phosphorus: {
          ...prevData.phosphorus,
          value: randomReading.phosphorus,
          data: [...prevData.phosphorus.data, {
            timestamp,
            phosphorus: randomReading.phosphorus,
            optimal: nutrientRanges.phosphorus.optimal
          }].slice(-20)
        },
        potassium: {
          ...prevData.potassium,
          value: randomReading.potassium,
          data: [...prevData.potassium.data, {
            timestamp,
            potassium: randomReading.potassium,
            optimal: nutrientRanges.potassium.optimal
          }].slice(-20)
        },
        ph: {
          ...prevData.ph,
          value: randomReading.ph,
          data: [...prevData.ph.data, {
            timestamp,
            ph: randomReading.ph,
            optimal: nutrientRanges.ph.optimal
          }].slice(-20)
        },
        calcium: {
          ...prevData.calcium,
          value: randomReading.calcium,
          data: [...prevData.calcium.data, {
            timestamp,
            calcium: randomReading.calcium,
            optimal: nutrientRanges.calcium.optimal
          }].slice(-20)
        }
      };

      // Update combined chart data
      setCombinedChartData(prev => [...prev, {
        timestamp,
        nitrogen: randomReading.nitrogen,
        phosphorus: randomReading.phosphorus,
        potassium: randomReading.potassium,
        ph: randomReading.ph,
        calcium: randomReading.calcium
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
        combinedChartData.map(row => 
          Object.values(row).join(",")
        ).join("\n");
      
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
          {/* Enhanced Header Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  Soil Nutrient Monitor
                </h1>
                <p className="text-gray-600 text-lg">
                  Real-time monitoring of your soil's nutrient levels
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-lg font-semibold text-gray-800">
                  {lastUpdateTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
  
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-xl font-bold text-blue-600">Active</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-sm text-gray-500">Sensors Active</p>
                <p className="text-xl font-bold text-green-600">5/5</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">System Status</p>
                <p className={`text-xl font-bold ${
                  systemStatus === 'optimal' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
                </p>
              </div>
            </div>
          </div>
  
          {/* Sensor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SensorCard
              title="Nitrogen"
              value={sensorData.nitrogen.value}
              unit="mg/kg"
              icon={<Leaf className="w-6 h-6" />}
              color="emerald"
              data={sensorData.nitrogen.data}
              range={nutrientRanges.nitrogen}
              isLoading={isLoading}
            />
            <SensorCard
              title="Phosphorus"
              value={sensorData.phosphorus.value}
              unit="mg/kg"
              icon={<Zap className="w-6 h-6" />}
              color="blue"
              data={sensorData.phosphorus.data}
              range={nutrientRanges.phosphorus}
              isLoading={isLoading}
            />
            <SensorCard
              title="Potassium"
              value={sensorData.potassium.value}
              unit="mg/kg"
              icon={<ThermometerSun className="w-6 h-6" />}
              color="amber"
              data={sensorData.potassium.data}
              range={nutrientRanges.potassium}
              isLoading={isLoading}
            />
            <SensorCard
              title="pH Level"
              value={sensorData.ph.value}
              unit=""
              icon={<Droplet className="w-6 h-6" />}
              color="rose"
              data={sensorData.ph.data}
              range={nutrientRanges.ph}
              isLoading={isLoading}
            />
            <SensorCard
              title="Calcium"
              value={sensorData.calcium.value}
              unit="mg/kg"
              icon={<Atom className="w-6 h-6" />}
              color="orange"
              data={sensorData.calcium.data}
              range={nutrientRanges.calcium}
              isLoading={isLoading}
            />
          </div>
  
          {/* Enhanced Charts Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Nutrient Trends</h2>
              <div className="flex gap-4">
                <select 
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                </select>
                <button 
                  onClick={handleExportData}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
      

<LineChart
  data={combinedChartData}
  margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
>
  <defs>
    {/* Gradient definitions for each line */}
    <linearGradient id="nitrogenGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="phosphorusGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="potassiumGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="phGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2}/>
      <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="calciumGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#F97316" stopOpacity={0.2}/>
      <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <CartesianGrid 
    strokeDasharray="3 3" 
    stroke="#E5E7EB" 
    opacity={0.3} 
    vertical={false}
  />
  <XAxis 
    dataKey="timestamp" 
    stroke="#94a3b8"
    tick={{ fontSize: 12, fill: '#64748b' }}
    tickLine={{ stroke: '#94a3b8' }}
    axisLine={{ stroke: '#E5E7EB' }}
  />
  <YAxis 
    stroke="#94a3b8"
    tick={{ fontSize: 12, fill: '#64748b' }}
    tickLine={{ stroke: '#94a3b8' }}
    axisLine={{ stroke: '#E5E7EB' }}
  />
  <Tooltip 
    contentStyle={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      border: 'none',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '1rem'
    }}
    labelStyle={{ 
      color: '#1e293b', 
      fontWeight: 600, 
      marginBottom: '0.75rem',
      fontSize: '0.875rem'
    }}
    itemStyle={{ 
      padding: '4px 0',
      fontSize: '0.875rem'
    }}
    cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
  />
  <Legend 
    verticalAlign="top" 
    height={36}
    iconType="circle"
    iconSize={8}
    wrapperStyle={{
      paddingBottom: '20px',
      fontSize: '13px'
    }}
  />
  <Line 
    type="monotone" 
    dataKey="nitrogen" 
    stroke="#10B981" 
    name="Nitrogen"
    strokeWidth={3}
    dot={false}
    activeDot={{ r: 8, strokeWidth: 0, fill: '#10B981' }}
    fill="url(#nitrogenGradient)"
  />
  <Line 
    type="monotone" 
    dataKey="phosphorus" 
    stroke="#3B82F6" 
    name="Phosphorus"
    strokeWidth={3}
    dot={false}
    activeDot={{ r: 8, strokeWidth: 0, fill: '#3B82F6' }}
    fill="url(#phosphorusGradient)"
  />
  <Line 
    type="monotone" 
    dataKey="potassium" 
    stroke="#F59E0B" 
    name="Potassium"
    strokeWidth={3}
    dot={false}
    activeDot={{ r: 8, strokeWidth: 0, fill: '#F59E0B' }}
    fill="url(#potassiumGradient)"
  />
  <Line 
    type="monotone" 
    dataKey="ph" 
    stroke="#EC4899" 
    name="pH"
    strokeWidth={3}
    dot={false}
    activeDot={{ r: 8, strokeWidth: 0, fill: '#EC4899' }}
    fill="url(#phGradient)"
  />
  <Line 
    type="monotone" 
    dataKey="calcium" 
    stroke="#F97316" 
    name="Calcium"
    strokeWidth={3}
    dot={false}
    activeDot={{ r: 8, strokeWidth: 0, fill: '#F97316' }}
    fill="url(#calciumGradient)"
  />
</LineChart>


              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Enhanced Recommendations Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recommended Actions</h2>
              <button 
                onClick={handleExportData}
                className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Download Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(manureRecommendations).map(([type, amount]) => (
                <div key={type} 
                     className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-800 capitalize">{type} Manure</h3>
                    {type === 'cattle' && <Leaf className="w-5 h-5 text-green-500" />}
                    {type === 'poultry' && <Zap className="w-5 h-5 text-amber-500" />}
                    {type === 'organic' && <Droplet className="w-5 h-5 text-blue-500" />}
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{amount.toFixed(1)}</p>
                  <p className="text-sm text-gray-600 mt-1">kg per hectare needed</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Efficiency</span>
                      <span className="text-green-600 font-medium">98%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Expert Recommendation Note</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    These recommendations are based on current soil nutrient levels and optimal growing conditions.
                    Actual needs may vary based on your soil type, crop requirements, and local environmental factors.
                    For best results, consult with your local agricultural expert and consider seasonal variations.
                  </p>
                  <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-700">
                    Learn more about soil nutrient management →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default NutrientDashboard;
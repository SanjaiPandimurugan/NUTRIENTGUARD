import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Download } from 'lucide-react';

const Analytics = () => {
  const [sensorHistory, setSensorHistory] = useState([]);
  const [manureRecommendations, setManureRecommendations] = useState({});
  const [timeRange, setTimeRange] = useState('24h'); // '24h', '7d', '30d', 'custom'
  const [historicalView, setHistoricalView] = useState('graph'); // 'graph' or 'table'

  // Generate mock historical data
  const generateHistoricalData = (days) => {
    const data = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        timestamp: date.toISOString(),
        time: date.toLocaleTimeString(),
        date: date.toLocaleDateString(),
        nitrogen: 35 + Math.random() * 10,
        phosphorus: 20 + Math.random() * 10,
        potassium: 180 + Math.random() * 40,
      });
    }
    return data;
  };

  useEffect(() => {
    // Initialize with historical data based on timeRange
    const daysMap = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
    };
    
    const historicalData = generateHistoricalData(daysMap[timeRange] || 1);
    setSensorHistory(historicalData);
  }, [timeRange]);

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Nitrogen', 'Phosphorus', 'Potassium'];
    const csvData = sensorHistory.map(record => 
      `${record.date},${record.time},${record.nitrogen.toFixed(2)},${record.phosphorus.toFixed(2)},${record.potassium.toFixed(2)}`
    );
    
    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrient-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800">Nutrient Analytics</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Download size={20} />
          Export Data
        </button>
      </div>
      
      {/* Time Range Controls */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg ${
                  timeRange === range 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setHistoricalView('graph')}
              className={`px-4 py-2 rounded-lg ${
                historicalView === 'graph'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Graph View
            </button>
            <button
              onClick={() => setHistoricalView('table')}
              className={`px-4 py-2 rounded-lg ${
                historicalView === 'table'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {historicalView === 'graph' ? (
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={sensorHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                          <p className="font-bold">{payload[0]?.payload.date} {label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {entry.value.toFixed(2)} mg/kg
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="nitrogen" stroke="#0088FE" name="Nitrogen" />
                <Line type="monotone" dataKey="phosphorus" stroke="#00C49F" name="Phosphorus" />
                <Line type="monotone" dataKey="potassium" stroke="#FFBB28" name="Potassium" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nitrogen (mg/kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phosphorus (mg/kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Potassium (mg/kg)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sensorHistory.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.nitrogen.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.phosphorus.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.potassium.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rest of your component remains the same */}
    </div>
  );
};

export default Analytics;
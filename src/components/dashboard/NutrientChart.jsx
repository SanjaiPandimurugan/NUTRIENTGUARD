import React, { useState } from 'react';
import { Download, History, FileJson } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ReferenceArea,
} from 'recharts';

const NutrientChart = ({ 
  combinedChartData, 
  timeRange, 
  setTimeRange,
  nutrientRanges,
  handleExportData 
}) => {
  const [historyPoints, setHistoryPoints] = useState(20);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}:</span>
              <span>{entry.value.toFixed(2)} mg/kg</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="flex items-center gap-6 mb-4 justify-center">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#059669]" />
        <span className="text-sm">Nitrogen (N)</span>
        <span className="text-xs text-gray-500">({nutrientRanges.nitrogen.min}-{nutrientRanges.nitrogen.max} mg/kg)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
        <span className="text-sm">Phosphorus (P)</span>
        <span className="text-xs text-gray-500">({nutrientRanges.phosphorus.min}-{nutrientRanges.phosphorus.max} mg/kg)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
        <span className="text-sm">Potassium (K)</span>
        <span className="text-xs text-gray-500">({nutrientRanges.potassium.min}-{nutrientRanges.potassium.max} mg/kg)</span>
      </div>
    </div>
  );

  const handleExportJSON = () => {
    const jsonData = JSON.stringify(combinedChartData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nutrient_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-800">Nutrient Trends</h2>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={historyPoints}
            onChange={(e) => setHistoryPoints(Number(e.target.value))}
            className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm"
          >
            <option value={10}>Last 10 points</option>
            <option value={20}>Last 20 points</option>
            <option value={50}>Last 50 points</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">CSV</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"
            >
              <FileJson className="w-4 h-4" />
              <span className="text-sm font-medium">JSON</span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={combinedChartData.slice(-historyPoints)}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="timestamp"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={[0, 220]}
              label={{ 
                value: 'Nutrient Level (mg/kg)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 }
              }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            {/* Optimal range areas for each nutrient */}
            <ReferenceArea
              y1={nutrientRanges.nitrogen.min}
              y2={nutrientRanges.nitrogen.max}
              fill="#05966920"
              fillOpacity={0.1}
              strokeOpacity={0.3}
              stroke="#059669"
              strokeDasharray="3 3"
            />
            <ReferenceArea
              y1={nutrientRanges.phosphorus.min}
              y2={nutrientRanges.phosphorus.max}
              fill="#3B82F620"
              fillOpacity={0.1}
              strokeOpacity={0.3}
              stroke="#3B82F6"
              strokeDasharray="3 3"
            />
            <ReferenceArea
              y1={nutrientRanges.potassium.min}
              y2={nutrientRanges.potassium.max}
              fill="#F59E0B20"
              fillOpacity={0.1}
              strokeOpacity={0.3}
              stroke="#F59E0B"
              strokeDasharray="3 3"
            />

            <Line 
              type="monotone"
              dataKey="nitrogen"
              stroke="#059669"
              name="Nitrogen (N)"
              strokeWidth={2}
              dot={{ fill: '#059669', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone"
              dataKey="phosphorus"
              stroke="#3B82F6"
              name="Phosphorus (P)"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone"
              dataKey="potassium"
              stroke="#F59E0B"
              name="Potassium (K)"
              strokeWidth={2}
              dot={{ fill: '#F59E0B', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NutrientChart;
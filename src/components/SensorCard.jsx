import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const SensorCard = ({ title, value, unit, icon, color, data, range }) => {
  // Calculate if value is in good range
  const isGoodValue = value >= range.min && value <= range.max;
  
  // Calculate trend
  const trend = data.length > 1 ? 
    data[data.length - 1][title.split(' ')[0].toLowerCase()] - 
    data[data.length - 2][title.split(' ')[0].toLowerCase()] : 0;

  // Format data for mini chart
  const chartData = data.map(item => ({
    value: item[title.split(' ')[0].toLowerCase()]
  }));

  // Get color classes based on the color prop
  const getColorClasses = () => {
    const colorMap = {
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-50' },
      rose: { bg: 'bg-rose-500', text: 'text-rose-500', light: 'bg-rose-50' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-500', light: 'bg-orange-50' }
    };
    return colorMap[color] || colorMap.emerald;
  };

  const colorClasses = getColorClasses();

  return (
    <div className={`${colorClasses.light} rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-gray-100`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className={`p-2 rounded-lg ${colorClasses.light}`}>
          <div className={colorClasses.text}>{icon}</div>
        </div>
        {trend !== 0 && (
          <div className={`flex items-center ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-xs ml-1">{Math.abs(trend).toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline">
          <span className={`text-2xl font-bold ${isGoodValue ? colorClasses.text : 'text-gray-800'}`}>
            {value.toFixed(1)}
          </span>
          <span className="text-gray-500 text-sm ml-1">{unit}</span>
        </div>
      </div>

      {/* Range Info */}
      <div className="text-sm text-gray-500 mb-4">
        <div className="flex justify-between mb-1">
          <span>Target: {range.optimal}{unit}</span>
          <span className={isGoodValue ? 'text-green-500' : colorClasses.text}>
            {isGoodValue ? '✓ Good' : `Target: ${range.optimal}${unit}`}
          </span>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-16 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={getColorClasses().bg.replace('bg-', '#')} stopOpacity={0.4} />
                <stop offset="100%" stopColor={getColorClasses().bg.replace('bg-', '#')} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={getColorClasses().bg.replace('bg-', '#')}
              fill={`url(#gradient-${color})`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorCard;
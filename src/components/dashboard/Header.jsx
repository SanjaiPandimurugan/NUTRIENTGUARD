import React from 'react';

const Header = ({ lastUpdateTime, systemStatus }) => {
  return (
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
  );
};

export default Header;
import React from 'react';

const ManureApplication = ({ sensorData = {} }) => {
  // These are simplified calculations. In a real-world scenario,
  // you'd need more complex algorithms based on soil type, crop type, etc.
  const calculateManureAmount = (nutrientLevel, optimalLevel, manureContent) => {
    const deficiency = Math.max(0, optimalLevel - nutrientLevel);
    return (deficiency * 10000) / manureContent; // kg/ha
  };

  const manureTypes = {
    cattle: { N: 0.5, P: 0.15, K: 0.5 },
    pig: { N: 0.6, P: 0.2, K: 0.5 },
    poultry: { N: 1.1, P: 0.8, K: 0.5 },
  };

  const recommendations = Object.entries(manureTypes).map(([type, content]) => ({
    type,
    amount: Math.max(
      calculateManureAmount(sensorData.nitrogen || 0, 60, content.N),
      calculateManureAmount(sensorData.phosphorus || 0, 40, content.P),
      calculateManureAmount(sensorData.potassium || 0, 50, content.K)
    ),
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-emerald-800">Manure Application Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map(({ type, amount }) => (
          <div key={type} className="bg-emerald-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold capitalize">{type} Manure</h3>
            <p className="text-2xl font-bold text-emerald-600">{amount.toFixed(2)} kg/ha</p>
            <p className="text-sm text-gray-600">Suggested application rate</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Note: These suggestions are based on current nutrient levels and simplified calculations.
        Actual application rates may vary based on soil type, crop requirements, and local regulations.
        Always consult with an agronomist for precise recommendations.
      </p>
    </div>
  );
};

export default ManureApplication;
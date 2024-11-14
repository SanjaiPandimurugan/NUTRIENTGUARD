import React from 'react';
import { FileText, Leaf, Zap, Droplet, AlertCircle } from 'lucide-react';

const ManureRecommendations = ({ manureRecommendations, handleExportData }) => {
  const getManureIcon = (type) => {
    switch (type) {
      case 'cattle':
        return <Leaf className="w-5 h-5 text-green-500" />;
      case 'poultry':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'organic':
        return <Droplet className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getEfficiencyColor = (amount) => {
    if (amount < 1000) return 'text-green-600';
    if (amount < 1500) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recommended Actions</h2>
          <p className="text-gray-600">AI-powered manure application suggestions</p>
        </div>
        
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
          <div 
            key={type}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800 capitalize">
                {type} Manure
              </h3>
              {getManureIcon(type)}
            </div>

            <p className="text-3xl font-bold text-blue-600">
              {amount.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              kg per hectare needed
            </p>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Efficiency</span>
                <span className={getEfficiencyColor(amount)}>
                  {Math.round(100 - (amount / 20))}%
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getEfficiencyColor(amount)} bg-opacity-50`}
                  style={{ 
                    width: `${Math.round(100 - (amount / 20))}%`,
                    transition: 'width 0.5s ease-in-out'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expert Recommendation Note */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Expert Recommendation Note
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              These recommendations are based on current soil nutrient levels and optimal growing conditions.
              Actual needs may vary based on your soil type, crop requirements, and local environmental factors.
              For best results, consult with your local agricultural expert and consider seasonal variations.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                Learn more about soil nutrient management →
              </button>
              <button className="text-green-600 text-sm font-medium hover:text-green-700 flex items-center gap-1">
                Download detailed report →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Tips Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <h5 className="font-medium text-emerald-700 mb-2">Best Time to Apply</h5>
          <p className="text-sm text-emerald-600">Early morning or late evening for optimal absorption</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
          <h5 className="font-medium text-amber-700 mb-2">Weather Consideration</h5>
          <p className="text-sm text-amber-600">Avoid application before heavy rain forecast</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h5 className="font-medium text-blue-700 mb-2">Application Method</h5>
          <p className="text-sm text-blue-600">Use uniform spreading for even distribution</p>
        </div>
      </div>
    </div>
  );
};

export default ManureRecommendations;
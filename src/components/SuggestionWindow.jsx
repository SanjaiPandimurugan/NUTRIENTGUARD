import React from 'react';

const SuggestionWindow = ({ sensorData }) => {
  const getSuggestion = () => {
    const { nitrogen, potassium, phosphorus, calcium, ph } = sensorData;
    let suggestions = [];

    if (nitrogen < 40) {
      suggestions.push("Nitrogen levels are low. Consider adding nitrogen-rich fertilizers or organic matter.");
    } else if (nitrogen > 80) {
      suggestions.push("Nitrogen levels are high. Reduce nitrogen fertilization.");
    }

    if (potassium < 30) {
      suggestions.push("Potassium levels are low. Add potassium-rich fertilizers or compost.");
    } else if (potassium > 70) {
      suggestions.push("Potassium levels are high. Reduce potassium fertilization.");
    }

    if (phosphorus < 20) {
      suggestions.push("Phosphorus levels are low. Add phosphorus-rich fertilizers or bone meal.");
    } else if (phosphorus > 60) {
      suggestions.push("Phosphorus levels are high. Reduce phosphorus fertilization.");
    }

    if (calcium < 1000) {
      suggestions.push("Calcium levels are low. Consider adding lime or gypsum.");
    } else if (calcium > 2000) {
      suggestions.push("Calcium levels are high. Monitor soil pH and adjust accordingly.");
    }

    if (ph < 6.0) {
      suggestions.push("Soil pH is low (acidic). Consider adding lime to raise pH.");
    } else if (ph > 7.5) {
      suggestions.push("Soil pH is high (alkaline). Consider adding sulfur to lower pH.");
    }

    return suggestions.length > 0 ? suggestions : ["All nutrient levels are within optimal ranges."];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-emerald-800">Suggestions</h2>
      <ul className="list-disc pl-5 space-y-2">
        {getSuggestion().map((suggestion, index) => (
          <li key={index} className="text-gray-700">{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionWindow;
import React from 'react';
import { Leaf, Zap, ThermometerSun, Droplet, Atom } from 'lucide-react';
import SensorCard from '../SensorCard';

const SensorGrid = ({ sensorData, nutrientRanges, isLoading }) => {
  // Add safety check
  if (!sensorData || !nutrientRanges) {
    return <div>Loading sensor data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {sensorData.nitrogen && (
        <SensorCard
          title="Nitrogen"
          value={sensorData.nitrogen.value || 0}
          unit="mg/kg"
          icon={<Leaf className="w-6 h-6" />}
          color="emerald"
          data={sensorData.nitrogen.data || []}
          range={nutrientRanges.nitrogen}
          isLoading={isLoading}
        />
      )}
      {sensorData.phosphorus && (
        <SensorCard
          title="Phosphorus"
          value={sensorData.phosphorus.value || 0}
          unit="mg/kg"
          icon={<Zap className="w-6 h-6" />}
          color="blue"
          data={sensorData.phosphorus.data || []}
          range={nutrientRanges.phosphorus}
          isLoading={isLoading}
        />
      )}
      {sensorData.potassium && (
        <SensorCard
          title="Potassium"
          value={sensorData.potassium.value || 0}
          unit="mg/kg"
          icon={<ThermometerSun className="w-6 h-6" />}
          color="amber"
          data={sensorData.potassium.data || []}
          range={nutrientRanges.potassium}
          isLoading={isLoading}
        />
      )}
      {sensorData.ph && (
        <SensorCard
          title="pH Level"
          value={sensorData.ph.value || 0}
          unit=""
          icon={<Droplet className="w-6 h-6" />}
          color="rose"
          data={sensorData.ph.data || []}
          range={nutrientRanges.ph}
          isLoading={isLoading}
        />
      )}
      {sensorData.calcium && (
        <SensorCard
          title="Calcium"
          value={sensorData.calcium.value || 0}
          unit="mg/kg"
          icon={<Atom className="w-6 h-6" />}
          color="orange"
          data={sensorData.calcium.data || []}
          range={nutrientRanges.calcium}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default SensorGrid;
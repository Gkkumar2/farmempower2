import React from 'react';

type AverageYearlyWeatherProps = {
  averageRainfall: number;
  averageTemperature: number;
};

const AverageYearlyWeather: React.FC<AverageYearlyWeatherProps> = ({ averageRainfall, averageTemperature }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-2xl font-semibold mb-4">Average Yearly Stats</h2>
      <div className="flex justify-between">
        <div>
          <p className="text-lg">Average Rainfall:</p>
          <p className="text-3xl">{averageRainfall.toFixed(2)} mm</p>
        </div>
        <div>
          <p className="text-lg">Average Temperature:</p>
          <p className="text-3xl">{(averageTemperature - 273.15).toFixed(2)} °C</p> {/* Convert from Kelvin to Celsius */}
        </div>
      </div>
    </div>
  );
};

export default AverageYearlyWeather;

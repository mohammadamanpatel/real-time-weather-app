import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axiosInstance";

const DailySummary = () => {
  const dispatch = useDispatch();
  const { dailySummaries } = useSelector((state) => state.weather);

  const [temperatureThreshold, setTemperatureThresholdInput] = useState("");
  const [weatherCondition, setWeatherConditionInput] = useState("");

  const handleThresholdSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/threshold", {
        temperatureThreshold: parseFloat(temperatureThreshold),
        weatherCondition,
      });

      dispatch(setTemperatureThresholdInput(temperatureThreshold));
      dispatch(setWeatherConditionInput(weatherCondition));

      alert("Thresholds set successfully!");
    } catch (error) {
      console.error("Error setting thresholds:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Daily Weather Summary</h2>

      <form onSubmit={handleThresholdSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Temperature Threshold (°C):</label>
          <input
            type="number"
            value={temperatureThreshold}
            onChange={(e) => setTemperatureThresholdInput(e.target.value)}
            className="border p-3 rounded w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Weather Condition:</label>
          <input
            type="text"
            value={weatherCondition}
            onChange={(e) => setWeatherConditionInput(e.target.value)}
            className="border p-3 rounded w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Rain, Snow, Clear"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
        >
          Set Thresholds
        </button>
      </form>

      <ul className="space-y-6">
        {dailySummaries &&
          dailySummaries.map((summary, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700">
                <strong>Date:</strong> {new Date(summary.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Avg Temp:</strong> {summary.averageTemperature.toFixed(1)}°C
              </p>
              <p className="text-gray-700">
                <strong>Max Temp:</strong> {summary.maxTemperature.toFixed(1)}°C
              </p>
              <p className="text-gray-700">
                <strong>Min Temp:</strong> {summary.minTemperature?.toFixed(1) || "N/A"}°C
              </p>
              <p className="text-gray-700">
                <strong>Condition:</strong> {summary.dominantCondition}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DailySummary;

import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const WeatherChart = () => {
  const { dailySummaries } = useSelector((state) => state.weather);

  const data = {
    labels: dailySummaries.map((summary) =>
      new Date(summary.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Average Temperature (°C)",
        data: dailySummaries.map((summary) => summary.averageTemperature),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Adding background color for hover effect
      },
      {
        label: "Max Temperature (°C)",
        data: dailySummaries.map((summary) => summary.maxTemperature),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Min Temperature (°C)",
        data: dailySummaries.map((summary) => summary.minTemperature || 0),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Temperature Trends</h3>
      <Line data={data} />
    </div>
  );
};

export default WeatherChart;

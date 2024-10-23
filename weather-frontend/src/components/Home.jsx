import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DailySummary from "./Daily-summary";
import WeatherChart from "./Weather-chart";
import { setEmail } from "../redux/weather-slice";
import useFetchWeather from "../hooks/Fetch-weather.jsx"; // Import the custom hook

const Home = () => {
  const dispatch = useDispatch();
  const [useremail, setEmailInput] = useState("");
  const email = useSelector((state) => state.weather.email);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (useremail) {
      dispatch(setEmail(useremail)); // Dispatch email to Redux store
    } else {
      alert("Please enter a valid email address.");
    }
  };

  // Fetch weather data once the email is set
  useFetchWeather();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center">
        Weather Monitoring System
      </h1>
      {!email ? (
        <form onSubmit={handleEmailSubmit} className="text-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={useremail}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            className="border rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 ml-2"
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <WeatherChart />
          <DailySummary />
        </>
      )}
    </div>
  );
};

export default Home;

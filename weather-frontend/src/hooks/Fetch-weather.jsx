import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDailySummaries,
  setLoading,
  setError,
} from "../redux/weather-slice.js";
import axiosInstance from "../config/axiosInstance.js";

const useFetchWeather = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.weather.email); // Get email from Redux state
  console.log("email in slice", email);

  useEffect(() => {
    const fetchWeatherData = async () => {
      dispatch(setLoading(true));
      try {
        // Call the backend to fetch summaries for all cities with email in the body
        const response = await axiosInstance.post(`/get-summary`, {
          email, // Send email in the request body
        });

        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          console.log("Data received as array:", response.data);
          // Dispatch the array of daily summaries to Redux store
          dispatch(setDailySummaries(response.data));
        } else {
          console.error(
            "Unexpected data format, expected an array",
            response.data
          );
          dispatch(setError("Unexpected data format from server."));
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error fetching weather data:", error.message);
        dispatch(setError(error.message));
      } finally {
        // Always set loading to false after the operation
        dispatch(setLoading(false));
      }
    };

    if (email) {
      console.log("email",email)
      // Only fetch if email is available
      fetchWeatherData(); // Initial fetch
    }
  }, [dispatch, email]); // Add email to dependencies
};

export default useFetchWeather;

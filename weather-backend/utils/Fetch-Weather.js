import axios from "axios";
import { config } from "dotenv";
config();
console.log("process.env.OPENWEATHER_API_KEY", process.env.OPENWEATHER_API_KEY);
export const fetchWeatherData = async (city) => {
  console.log("city", city);
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    // console.log("response",response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${city}:`, error.message);
    return null;
  }
};

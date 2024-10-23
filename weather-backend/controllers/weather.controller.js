import WeatherSummary from "../models/weather.model.js";
import { cities } from "../utils/city.data.js";
import { fetchWeatherData } from "../utils/Fetch-Weather.js";
import alertmail from "../utils/mail-sender.js";
let thresholds = {
  temperatureThreshold: null,
  weatherCondition: null,
};
// Save daily summary using arrow function
const SaveDailySummary = async (data, useremail) => {
  // Log the entire data object to ensure it's correct
  console.log("data in SaveDailySummary", data);

  // Ensure the necessary fields are present
  if (!data.main || !data.weather || !data.dt) {
    console.error("Invalid data received:", data);
    return;
  }

  // Extract necessary values with proper checks
  const { main, weather, dt } = data;

  try {
    // Extract and log relevant fields
    console.log("data.main.temp", main.temp);
    console.log("data.weather[0].main", weather[0].main);
    console.log("data.main", main);

    // Convert `dt` into a date object
    const date = new Date(dt * 1000);
    console.log("date before normalization", date);

    // Normalize the date to the start of the day
    date.setHours(0, 0, 0, 0);
    console.log("Normalized date", date);

    // Check if there's already a summary for this date
    let summary = await WeatherSummary.findOne({ date });
    console.log("summary after findOne", summary);

    // If no summary exists, create a new one
    if (!summary) {
      summary = new WeatherSummary({
        email: useremail,
        date: date,
        averageTemperature: main.temp,
        maxTemperature: main.temp_max,
        minTemperature: main.temp_min,
        dominantCondition: weather[0].main,
        humidity: main.humidity, // Include humidity
        windSpeed: data.wind.speed, // Include wind speed
        feelsLike: main.feels_like, // Include perceived temperature
        dataUpdateTime: new Date(dt * 1000), // Store the update time
      });
      console.log("New summary created", summary);
    } else {
      // If a summary exists, update it with new data
      summary.email = useremail;
      summary.averageTemperature = (summary.averageTemperature + main.temp) / 2;
      summary.maxTemperature = Math.max(summary.maxTemperature, main.temp_max);
      summary.minTemperature = Math.min(summary.minTemperature, main.temp_min);
      summary.dominantCondition =
        summary.dominantCondition === weather[0].main
          ? summary.dominantCondition
          : weather[0].main;
      summary.humidity = main.humidity; // Update humidity
      summary.windSpeed = data.wind.speed; // Update wind speed
      summary.feelsLike = main.feels_like; // Update perceived temperature
      summary.dataUpdateTime = new Date(dt * 1000); // Update the data update time
    }
    checkThresholds(main.temp, weather[0].main, useremail);

    // Save the summary to the database
    await summary.save();
    console.log("Summary saved:", summary);

    return summary; // Return the saved summary to send back to the frontend
  } catch (error) {
    console.error("Error in SaveDailySummary:", error);
    throw new Error(`Failed to save daily summary: ${error.message}`);
  }
};

// Function to check thresholds
const checkThresholds = async (temperature, condition, useremail) => {
  console.log(
    "temperature, condition, useremail",
    temperature,
    condition,
    useremail
  );
  if (
    thresholds.temperatureThreshold !== null &&
    temperature > thresholds.temperatureThreshold
  ) {
    // Ensure the email is passed first
    await alertmail(
      useremail, // Pass the email here correctly
      `Alert: Temperature exceeded threshold! Current: ${temperature}°C`,
      `Current temperature: ${temperature}°C`
    );
  }

  if (
    thresholds.weatherCondition !== null &&
    condition === thresholds.weatherCondition
  ) {
    // Ensure the email is passed first
    await alertmail(
      useremail, // Pass the email here as well
      `Alert: Current weather condition is ${condition}!`,
      `Current condition: ${condition}`
    );
  }
};

export const get_temp_Threshold_inps = (req, res) => {
  if (!req.body.temperatureThreshold || !req.body.weatherCondition) {
    return res
      .status(400)
      .send("Both temperatureThreshold and weatherCondition are required");
  }

  // Destructure only if values are present
  const { temperatureThreshold, weatherCondition } = req.body;

  // Set the global thresholds
  thresholds.temperatureThreshold = temperatureThreshold;
  thresholds.weatherCondition = weatherCondition;

  console.log(
    `Thresholds set: Temperature - ${thresholds.temperatureThreshold}°C, Condition - ${thresholds.weatherCondition}`
  );
  res.send(
    "Thresholds set successfully,you will recieve a mail before the bad weather condition"
  );
};
// API route to fetch weather data and return it to the frontend
export const fetchWeatherSummaries = async (req, res) => {
  console.log(" req.body", req.body);
  const useremail = req.body.email;
  try {
    const summaries = [];
    for (const city of cities) {
      const weatherData = await fetchWeatherData(city);
      // console.log("weatherData", weatherData);
      if (weatherData) {
        const savedSummary = await SaveDailySummary(weatherData, useremail);
        summaries.push(savedSummary); // Collect summaries for each city
      }
    }
    // Send the summaries back to the frontend
    console.log("summaries", summaries);
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

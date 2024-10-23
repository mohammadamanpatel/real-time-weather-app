import mongoose from "mongoose";

const weatherSummarySchema = new mongoose.Schema({
  email: {type: String,required:true},
  date: { type: Date, required: true },
  averageTemperature: Number,
  maxTemperature: Number,
  minTemperature: Number,
  dominantCondition: String,
  humidity: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
  feelsLike: { type: Number, required: true },
  dataUpdateTime: { type: Date, required: true },
});

const WeatherSummary = mongoose.model("WeatherSummary", weatherSummarySchema);
export default WeatherSummary;

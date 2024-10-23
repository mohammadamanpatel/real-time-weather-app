import express from "express";
import {
  fetchWeatherSummaries,
  get_temp_Threshold_inps,
} from "../controllers/weather.controller.js";
const router = express.Router();
router.post("/get-summary", fetchWeatherSummaries);
router.post("/threshold", get_temp_Threshold_inps);
export default router;

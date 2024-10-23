import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailySummaries: [],
  alert: null,
  loading: false,
  error: null,
  email: localStorage.getItem("email") || null, // Load email from localStorage if available
  temperatureThreshold: localStorage.getItem("temperatureThreshold") || null, // Load temperatureThreshold from localStorage if available
  weatherCondition: localStorage.getItem("weatherCondition") || null, // Load weatherCondition from localStorage if available
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setDailySummaries: (state, action) => {
      state.dailySummaries = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("email", action.payload); // Persist email in localStorage
    },
    settemperatureThreshold: (state, action) => {
      console.log("state, action of settemperatureThreshold",state,action)
      state.temperatureThreshold = action.payload;
      localStorage.setItem("temperatureThreshold", action.payload); // Persist temperatureThreshold in localStorage
    },
    setweatherCondition: (state, action) => {
      console.log("state, action of setweatherCondition",state,action)
      state.weatherCondition = action.payload;
      localStorage.setItem("weatherCondition", action.payload); // Persist weatherCondition in localStorage
    },
  },
});

export const {
  setDailySummaries,
  setAlert,
  setLoading,
  setError,
  setEmail,
  settemperatureThreshold,
  setweatherCondition,
} = weatherSlice.actions;
export default weatherSlice.reducer;

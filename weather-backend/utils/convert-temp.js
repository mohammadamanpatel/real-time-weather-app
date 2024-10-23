export const convertTemperature = (temp, unit) => {
  if (unit === "F") {
    // Convert Fahrenheit to Celsius
    return (temp - 32) * 5 / 9;
  } else if (unit === "K") {
    // Convert Kelvin to Celsius
    return temp - 273.15;
  }
  // If already in Celsius or invalid unit, return as-is
  return temp;
};

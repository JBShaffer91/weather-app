const axios = require('axios');

// Set default parameters for API request
const params = {
  appid: '7e79cb953cdac3aeccf2d596ff8b595d',
  units: 'metric' // Celsius by default
};

// Function to get weather data from OpenWeather API
async function getWeatherData(city, country) {
  try {
    // Make API request with given city and country
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        ...params,
        q: `${city},${country}`
      }
    });

    // Extract relevant information from API response
    const { weather, main, wind, sys } = response.data;

    // Additional weather information
    const { description, icon } = weather[0];
    const { temp_min, temp_max, feels_like, humidity, pressure } = main;
    const { speed, deg } = wind;
    const { sunrise, sunset } = sys;

    // Temperature conversion to Fahrenheit
    const tempF = (main.temp * 9/5) + 32;

    // Return an object with all the relevant information
    return {
      description,
      icon,
      tempC: main.temp,
      tempF,
      temp_min,
      temp_max,
      feels_like,
      humidity,
      pressure,
      speed,
      deg,
      sunrise,
      sunset
    };
  } catch (error) {
    console.error(error);
    throw new Error('Unable to retrieve weather data');
  }
}

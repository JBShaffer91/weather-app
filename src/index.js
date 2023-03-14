import './css/styles.css';
import { getWeatherData } from './weather';

// Get HTML elements to display weather data
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const minTemperature = document.getElementById('min-temperature');
const maxTemperature = document.getElementById('max-temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const windSpeed = document.getElementById('wind-speed');
const windDirection = document.getElementById('wind-direction');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// Function to update weather data in HTML
function updateWeatherData(data) {
  weatherDescription.textContent = data.description;
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.icon}.png`);
  temperature.textContent = `${data.tempF}°F (${data.tempC}°C)`;
  minTemperature.textContent = `Min Temp: ${data.temp_min}°C`;
  maxTemperature.textContent = `Max Temp: ${data.temp_max}°C`;
  feelsLike.textContent = `Feels Like: ${data.feels_like}°C`;
  humidity.textContent = `Humidity: ${data.humidity}%`;
  pressure.textContent = `Pressure: ${data.pressure} hPa`;
  windSpeed.textContent = `Wind Speed: ${data.speed} m/s`;
  windDirection.textContent = `Wind Direction: ${data.deg}°`;
  sunrise.textContent = `Sunrise: ${new Date(data.sunrise * 1000).toLocaleTimeString()}`;
  sunset.textContent = `Sunset: ${new Date(data.sunset * 1000).toLocaleTimeString()}`;
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  try {
    const data = await getWeatherData(city, country);
    updateWeatherData(data);
  } catch (error) {
    console.error(error);
  }
}

// Add event listener to form
const form = document.getElementById('weather-form');
form.addEventListener('submit', handleFormSubmit);

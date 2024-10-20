const apiKey = "76e38afd41835302tc2b2d326b8154o1"; // Replace with your actual API key
const baseURL = "https://jsonplaceholder.typicode.com/users/1";

async function getWeather() {
  const city = document.getElementById("city-input").value;
  if (!city) return alert("Please enter a city name");

  try {
    // Fetch current weather data
    const weatherResponse = await fetch(
      `${baseURL}weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherResponse.json();
    if (weatherData.cod === "404") throw new Error("City not found");

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${baseURL}forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    // Display weather data
    displayWeather(weatherData);
    displayForecast(forecastData.list);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById(
    "city-name"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("date-time").textContent =
    new Date().toLocaleString();
  document.getElementById("weather-desc").textContent =
    data.weather[0].description;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById(
    "wind-speed"
  ).textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayForecast(forecastList) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  // Display next 5 forecasts (every 3 hours)
  for (let i = 0; i < 5; i++) {
    const forecast = forecastList[i * 8]; // Every 8 items represent a 24-hour period
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    const forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";
    forecastItem.innerHTML = `
      <p>${date}</p>
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather icon">
      <p>${forecast.main.temp}°C</p>
    `;
    forecastDiv.appendChild(forecastItem);
  }
}

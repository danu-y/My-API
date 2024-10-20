const apiKey = "76e38afd41835302tc2b2d326b8154o1";
const weatherURL = "https://api.shecodes.io/weather/v1/current?query=";

async function getWeather() {
  const city = document.getElementById("city-input").value || "Addis Ababa";

  try {
    // Fetch weather data from SheCodes API
    const response = await fetch(`${weatherURL}${city}&key=${apiKey}`);
    const data = await response.json();

    if (response.status !== 200) throw new Error("City not found");

    displayWeather(data);

    // Fetch user information from JSONPlaceholder API
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const userData = await userResponse.json();
    displayUserInfo(userData);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = data.city;
  document.getElementById(
    "current-temp"
  ).textContent = `${data.temperature.current}°C`;
  document.getElementById("weather-desc").textContent =
    data.condition.description;
  document.getElementById("humidity").textContent = data.temperature.humidity;
  document.getElementById("wind-speed").textContent =
    data.wind.speed.toFixed(2);
  document.getElementById("current-icon").src = data.condition.icon_url;
}

function displayUserInfo(userData) {
  document.getElementById("user-name").textContent = userData.name;
  document.getElementById("user-email").textContent = userData.email;
  document.getElementById("user-city").textContent = userData.address.city;
}

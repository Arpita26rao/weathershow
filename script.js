// Using OpenWeatherMap API since that's what the API key is for
const apiKey = "d6c503c79ec2aba76ba8e37cc37e16e6"; // Note: In production, hide this in env variables
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Select elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const temp = document.getElementById('temp');
const cityName = document.getElementById('cityName');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherIcon = document.getElementById('weatherIcon');

// Weather icon mapping
const weatherIcons = {
    "Clear": "/clear.png",
    "Clouds": "/clouds.png",
    "Rain": "/rain.png",
    "Drizzle": "/drizzle.png",
    "Mist": "/mist.png",
    "Snow": "/snow.png"
};

// Add event listener to the search button
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city) {
        try {
            const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                weatherInfo.style.display = 'block';
                weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
                return;
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherInfo.style.display = 'block';
            weatherInfo.innerHTML = `<p>Unable to fetch weather data. Try again later.</p>`;
            console.error('Error:', error);
        }
    } else {
        weatherInfo.style.display = 'block';
        weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
    }
});

// Function to display weather data
function displayWeather(data) {
    const { name, main: { temp: temperature, humidity: hum }, wind: { speed }, weather } = data;
    const weatherMain = weather[0].main;

    // Update DOM elements
    cityName.textContent = name;
    temp.textContent = `${Math.round(temperature)}°C`;
    humidity.textContent = `${hum}%`;
    wind.textContent = `${speed} km/h`;
    weatherIcon.src = weatherIcons[weatherMain] || "/clouds.png"; // Default to clouds if no match

    // Show weather info
    weatherInfo.style.display = 'block';
    weatherInfo.querySelector('p:not(.humidity):not(.wind)')?.remove(); // Remove error messages
}
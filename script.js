// script.js
const apiKey = '23240f8aea46c2c5957131817e1114b6';
let city = 'London'; // Default city

// Fetch weather data
function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cityElement = document.getElementById('city');
            const day1DateElement = document.getElementById('day1-date');
            const day1DescriptionElement = document.getElementById('day1-description');
            const day1TemperatureElement = document.getElementById('day1-temperature');
            const day1HumidityElement = document.getElementById('day1-humidity');

            const day2DateElement = document.getElementById('day2-date');
            const day2DescriptionElement = document.getElementById('day2-description');
            const day2TemperatureElement = document.getElementById('day2-temperature');
            const day2HumidityElement = document.getElementById('day2-humidity');

            const day3DateElement = document.getElementById('day3-date');
            const day3DescriptionElement = document.getElementById('day3-description');
            const day3TemperatureElement = document.getElementById('day3-temperature');
            const day3HumidityElement = document.getElementById('day3-humidity');

            cityElement.textContent = data.city.name;

            const day1 = data.list[0];
            const day2 = data.list[8]; // 8th element is approximately 24 hours later
            const day3 = data.list[16]; // 16th element is approximately 48 hours later

            day1DateElement.textContent = new Date(day1.dt_txt).toLocaleDateString();
            day1DescriptionElement.textContent = `Weather: ${day1.weather[0].description}`;
            day1TemperatureElement.textContent = `Temperature: ${day1.main.temp}°C`;
            day1HumidityElement.textContent = `Humidity: ${day1.main.humidity}%`;

            day2DateElement.textContent = new Date(day2.dt_txt).toLocaleDateString();
            day2DescriptionElement.textContent = `Weather: ${day2.weather[0].description}`;
            day2TemperatureElement.textContent = `Temperature: ${day2.main.temp}°C`;
            day2HumidityElement.textContent = `Humidity: ${day2.main.humidity}%`;

            day3DateElement.textContent = new Date(day3.dt_txt).toLocaleDateString();
            day3DescriptionElement.textContent = `Weather: ${day3.weather[0].description}`;
            day3TemperatureElement.textContent = `Temperature: ${day3.main.temp}°C`;
            day3HumidityElement.textContent = `Humidity: ${day3.main.humidity}%`;

            changeBackground(day1.weather[0].main); // Update background based on weather
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Change background based on weather
function changeBackground(weather) {
    const weatherContainer = document.getElementById('weather-container');
    if (weather.includes('Clear')) {
        weatherContainer.style.backgroundImage = "url('sunny.jpg')";
    } else if (weather.includes('Rain')) {
        weatherContainer.style.backgroundImage = "url('rainy.jpg')";
    } else if (weather.includes('Clouds')) {
        weatherContainer.style.backgroundImage = "url('cloudy.jpg')";
    } else {
        weatherContainer.style.backgroundImage = "url('default.jpg')";
    }
}

// Handle user input for city change
document.getElementById('search-btn').addEventListener('click', () => {
    city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    }
});

// Fetch initial weather data
fetchWeather(city);

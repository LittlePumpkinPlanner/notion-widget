// script.js

// Mapping weather descriptions to FontAwesome icons
const weatherIcons = {
    "clear sky": "fas fa-sun",
    "few clouds": "fas fa-cloud-sun",
    "scattered clouds": "fas fa-cloud",
    "broken clouds": "fas fa-cloud",
    "shower rain": "fas fa-cloud-showers-heavy",
    "rain": "fas fa-cloud-rain",
    "thunderstorm": "fas fa-bolt",
    "snow": "fas fa-snowflake",
    "mist": "fas fa-smog",
    // Add other weather conditions as necessary
};

// Function to get the correct icon based on the weather description
function getWeatherIcon(description) {
    return weatherIcons[description] || "fas fa-question"; // Default icon if description is not mapped
}

function getWeather() {
    const city = document.getElementById('city-input').value;
    const unit = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=23240f8aea46c2c5957131817e1114b6`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const currentWeather = data.list[0];
            const weatherElement = document.getElementById('current-weather');
            const weatherIconClass = getWeatherIcon(currentWeather.weather[0].description);

            weatherElement.innerHTML = `
                <i class="${weatherIconClass}"></i>
                <h2>${data.city.name}</h2>
                <p>Weather: ${currentWeather.weather[0].description}</p>
                <p>Temperature: ${currentWeather.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
                <p>Humidity: ${currentWeather.main.humidity}%</p>
            `;

            const forecastElement = document.getElementById('forecast');
            forecastElement.innerHTML = ''; // Clear previous forecast

            // Loop through the forecast and display 3-day forecast
            for (let i = 0; i < 3; i++) {
                const forecastData = data.list[i * 8]; // Every 8th index represents the next day
                const weatherIconClass = getWeatherIcon(forecastData.weather[0].description);

                const forecastDay = document.createElement('div');
                forecastDay.classList.add('forecast-day');
                forecastDay.innerHTML = `
                    <p>${new Date(forecastData.dt_txt).toLocaleDateString()}</p>
                    <i class="${weatherIconClass}"></i>
                    <p>${forecastData.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p> 
                `;
                forecastElement.appendChild(forecastDay);
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('current-weather').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
            document.getElementById('forecast').innerHTML = ''; // Clear the forecast
        });
}


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
};

const backgroundColors = {
    "clear sky": "#f7b733",
    "few clouds": "#f5af19",
    "scattered clouds": "#2193b0",
    "broken clouds": "#6dd5ed",
    "shower rain": "#4e54c8",
    "rain": "#4b79a1",
    "thunderstorm": "#2c3e50",
    "snow": "#bdc3c7",
    "mist": "#e0eafc",
};

function getWeatherIcon(description) {
    return weatherIcons[description] || "fas fa-question";
}

function getBackgroundColor(description) {
    return backgroundColors[description] || "#333";
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
            const backgroundColor = getBackgroundColor(currentWeather.weather[0].description);

            weatherElement.innerHTML = `
                <i class="${weatherIconClass}" style="font-size: 48px;"></i>
                <h2>${data.city.name}</h2>
                <p>Weather: ${currentWeather.weather[0].description}</p>
                <p>Temperature: ${currentWeather.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
                <p>Humidity: ${currentWeather.main.humidity}%</p>
            `;
            weatherElement.style.backgroundColor = backgroundColor;

            const forecastElement = document.getElementById('forecast');
            forecastElement.innerHTML = ''; // Clear previous forecast

            for (let i = 0; i < 4; i++) { // Loop adjusted for 4-day forecast
                const forecastData = data.list[i * 8]; // Every 8th index represents the next day
                const forecastIconClass = getWeatherIcon(forecastData.weather[0].description);

                const forecastDay = document.createElement('div');
                forecastDay.classList.add('forecast-day');
                forecastDay.innerHTML = `
                    <p>${new Date(forecastData.dt_txt).toLocaleDateString()}</p>
                    <i class="${forecastIconClass}"></i>
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

const apiKey = '23240f8aea46c2c5957131817e1114b6';
let city = 'London'; // Default city
let unit = 'metric'; // Default unit for Celsius

// Fetch weather data
function fetchWeather(city, unit) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update city name
            document.getElementById('city').textContent = data.city.name;

            // Handle current day's forecast
            const current = data.list[0];
            document.getElementById('current-description').textContent = `Weather: ${current.weather[0].description}`;
            document.getElementById('current-temperature').textContent = `Temperature: ${current.main.temp}°${unit === 'metric' ? 'C' : 'F'}`;
            document.getElementById('current-humidity').textContent = `Humidity: ${current.main.humidity}%`;

            // Change background and icon based on current day's weather
            changeBackgroundAndIcon(current.weather[0].main);

            // Clear old forecast
            document.getElementById('forecast').innerHTML = '';

            // Handle 4-day forecast
            for (let i = 1; i <= 4; i++) {
                const forecastIndex = i * 8 - 1; // 3-hour intervals, pick the closest to next day
                const forecastData = data.list[forecastIndex];
                const forecastElement = document.createElement('div');
                forecastElement.className = 'forecast-day';

                forecastElement.innerHTML = `
                    <p>${new Date(forecastData.dt_txt).toLocaleDateString()}</p>
                    <p>${forecastData.weather[0].description}</p>
                    <p>${forecastData.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
                `;
                document.getElementById('forecast').appendChild(forecastElement);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not retrieve weather data. Please check your API key and city name.');
        });
}

// Change background and icon based on weather
function changeBackgroundAndIcon(weather) {
    const currentWeather = document.getElementById('current-weather');
    const weatherIcon = document.getElementById('weather-icon');
    if (weather.includes('Clear')) {
        currentWeather.style.backgroundImage = "url('sunny.jpg')";
        weatherIcon.src = 'sunny-icon.png';
    } else if (weather.includes('Rain')) {
        currentWeather.style.backgroundImage = "url('rainy.jpg')";
        weatherIcon.src = 'rainy-icon.png';
    } else if (weather.includes('Clouds')) {
        currentWeather.style.backgroundImage = "url('cloudy.jpg')";
        weatherIcon.src = 'cloudy-icon.png';
    } else {
        currentWeather.style.backgroundImage = "url('default.jpg')";
        weatherIcon.src = 'default-icon.png';
    }
}

// Handle user input for city and unit change
document.getElementById('search-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value;
    const unit = prompt('Enter "metric" for Celsius or "imperial" for Fahrenheit:', 'metric');
    if (cityInput) {
        fetchWeather(cityInput, unit);
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch initial weather data
fetchWeather(city, unit);




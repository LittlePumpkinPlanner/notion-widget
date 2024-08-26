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

    // Mapping weather descriptions to icons
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

    // Inserting the forecast data with icons
    forecastData.list.forEach(forecastData => {
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast-day');
    
    // Use the getWeatherIcon function to get the icon class
    const weatherIconClass = getWeatherIcon(forecastData.weather[0].description);
    
    forecastElement.innerHTML = `
        <p>${new Date(forecastData.dt_txt).toLocaleDateString()}</p>
        <i class="${weatherIconClass}"></i>  <!-- Display the icon here -->
        <p>${forecastData.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p> 
    `;
    
    document.getElementById('forecast').appendChild(forecastElement);
});


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




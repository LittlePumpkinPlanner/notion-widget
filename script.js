const apiKey = '23240f8aea46c2c5957131817e1114b6';
let city = 'London'; // Default city

// Fetch weather data
function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update city name
            document.getElementById('city').textContent = data.city.name;

            // Handle first day's forecast
            const day1 = data.list[0];
            document.getElementById('day1-date').textContent = new Date(day1.dt_txt).toLocaleDateString();
            document.getElementById('day1-description').textContent = `Weather: ${day1.weather[0].description}`;
            document.getElementById('day1-temperature').textContent = `Temperature: ${day1.main.temp}°C`;
            document.getElementById('day1-humidity').textContent = `Humidity: ${day1.main.humidity}%`;

            // Handle second day's forecast
            const day2 = data.list[8]; // 24 hours later
            document.getElementById('day2-date').textContent = new Date(day2.dt_txt).toLocaleDateString();
            document.getElementById('day2-description').textContent = `Weather: ${day2.weather[0].description}`;
            document.getElementById('day2-temperature').textContent = `Temperature: ${day2.main.temp}°C`;
            document.getElementById('day2-humidity').textContent = `Humidity: ${day2.main.humidity}%`;

            // Handle third day's forecast
            const day3 = data.list[16]; // 48 hours later
            document.getElementById('day3-date').textContent = new Date(day3.dt_txt).toLocaleDateString();
            document.getElementById('day3-description').textContent = `Weather: ${day3.weather[0].description}`;
            document.getElementById('day3-temperature').textContent = `Temperature: ${day3.main.temp}°C`;
            document.getElementById('day3-humidity').textContent = `Humidity: ${day3.main.humidity}%`;

            // Change background based on first day's weather
            changeBackground(day1.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not retrieve weather data. Please check your API key and city name.');
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
    const cityInput = document.getElementById('city-input').value;
    if (cityInput) {
        fetchWeather(cityInput);
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch initial weather data
fetchWeather(city);

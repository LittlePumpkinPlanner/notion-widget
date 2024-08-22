// script.js
const apiKey = '23240f8aea46c2c5957131817e1114b6';
const city = 'Lisbon'; // Change to the city you want

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const cityElement = document.getElementById('city');
        const descriptionElement = document.getElementById('description');
        const temperatureElement = document.getElementById('temperature');
        const humidityElement = document.getElementById('humidity');

        cityElement.textContent = data.name;
        descriptionElement.textContent = `Weather: ${data.weather[0].description}`;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

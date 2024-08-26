const apiKey = '23240f8aea46c2c5957131817e1114b6';
let currentCity = 'Kyiv';
let isCelsius = true;

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => updateWidget(data));
}

function updateWidget(data) {
  const currentWeather = data.list[0];
  const forecast = data.list.slice(1, 5);
  
  document.getElementById('city').textContent = data.city.name;
  document.getElementById('date').textContent = new Date(currentWeather.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  document.getElementById('current-temp').textContent = `${Math.round(currentWeather.main.temp)}°${isCelsius ? 'C' : 'F'}`;
  
  document.getElementById('current-icon').querySelector('img').src = `icons/${currentWeather.weather[0].icon}.png`;

  const days = document.querySelectorAll('.day');
  forecast.forEach((day, index) => {
    days[index].querySelector('.day-name').textContent = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    days[index].querySelector('.icon').src = `icons/${day.weather[0].icon}.png`;
    days[index].querySelector('.temp').textContent = `${Math.round(day.main.temp)}°${isCelsius ? 'C' : 'F'}`;
  });
}

document.getElementById('weather-widget').addEventListener('click', () => {
  isCelsius = !isCelsius;
  fetchWeather(currentCity);
});

fetchWeather(currentCity);



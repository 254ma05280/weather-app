const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMessage = document.getElementById('error-message');

const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const conditionDisplay = document.getElementById('condition');
const humidityDisplay = document.getElementById('humidity');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') {
            fetchWeatherData(city);
        }
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Using Fetch API for data[cite: 3]
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json(); // JSON parsing[cite: 3]
        })
        .then(data => {
            displayWeatherData(data);
            errorMessage.classList.add('hidden');
        })
        .catch(error => {
            weatherCard.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        });
}

function displayWeatherData(data) {
    cityNameDisplay.textContent = `${data.name}, ${data.sys.country}`;
    tempDisplay.textContent = Math.round(data.main.temp);
    conditionDisplay.textContent = data.weather[0].description;
    humidityDisplay.textContent = data.main.humidity;

    weatherCard.classList.remove('hidden');
}
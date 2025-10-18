// Replace with your OpenWeatherMap API key
const API_KEY = 'e670da14bdd9f176acf9709b5d0f3ad1';

const weatherEl = document.getElementById('weather');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.main) {
                weatherEl.innerHTML = `
                    <p><strong>${data.name}</strong>: ${data.main.temp}°C, ${data.weather[0].description}</p>
                `;
            } else {
                weatherEl.innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(err => {
            weatherEl.innerHTML = `<p>Error fetching weather.</p>`;
            console.error(err);
        });
}

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

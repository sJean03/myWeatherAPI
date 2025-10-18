// API Key for OpenWeatherMap (replace with your own)
const API_KEY = '0a2d9639431cc378d1fdad69cc9bb0e6'; // Get from https://openweathermap.org/api
const CITY = 'London'; // Default city for weather

// Function to fetch and display weather on homepage
async function fetchWeather() {
    const weatherDiv = document.getElementById('weather');
    if (!weatherDiv) return; // Only run on homepage

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('Weather API failed');
        const data = await response.json();
        weatherDiv.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Description: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        weatherDiv.innerHTML = '<p>Unable to load weather data. Check your API key.</p>';
        console.error(error);
    }
}

// Function to handle contact form submission
async function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        // Mock API submission (replace with real endpoint, e.g., Formspree or your backend)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Submission failed');
        document.getElementById('form-response').textContent = 'Thank you! Your message has been sent.';
        form.reset();
    } catch (error) {
        document.getElementById('form-response').textContent = 'Error sending message. Please try again.';
        console.error(error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather(); // Load weather on homepage
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
});
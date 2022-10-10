const local = document.querySelector("#location p");
const weatherIcon = document.querySelector(".weather-icon > p > i");
const temperatureText = document.getElementById("#current-temperature");
const weatherWMO = document.getElementById("#weather-info-WMO");

let coordinates;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(reverseGeocode);
  } else { 
    local.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function reverseGeocode (position){
    
    const localization = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=073bcfa58879488cb759d728980d7b1a`);

    const localizationData = await localization.json();

    showPosition(localizationData);
    weather(position);
}

function showPosition(position) {
    local.innerHTML = `${position.features[0].properties.city} - ${position.features[0].properties.county}`;
}

async function weather(coordinates) {
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.coords.latitude}&longitude=${coordinates.coords.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,freezinglevel_height,weathercode&current_weather=true`);

        const weatherData = await weather.json();
        showWeather(weatherData);
}

const showWeather = (weather) => {
    console.log(weather);
    temperatureText.innerText = `Sensação: ${weather.current_weather.temperature} °C`
}

getLocation();





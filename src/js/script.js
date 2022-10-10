const local = document.querySelector("[location] p");
const weatherIcon = document.querySelector("[weather-icon] p");
const temperatureText = document.querySelector("[temperature-data]");
const wmoDescription = document.querySelector("[wmo-description-data]");
const feelsLike = document.querySelector("[feels-like-data]");
const weatherWMO = document.querySelector("[wmo-condition-data]");
const humidity = document.querySelector("[humidity-data]");
const windSpeed = document.querySelector("[wind-speed-data]");
const cloudCover = document.querySelector("[cloud-cover-data]");

const mainbackground = document.querySelector('[main-background]');

console.log(mainbackground.style);


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
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&appid=93c86fbe3c483f3a4f721b21fdefdfc4&lang=pt_br&units=metric`);

    const weatherData = await weather.json();

    showWeather(weatherData);
}

const showWeather = (currentWeather) => {
    console.log(currentWeather);
    switch (currentWeather.weather[0].icon) {
        case "01d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
            break;
        case "01n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
            break;
        case "02d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
            break;
        case "02n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-moon"></i>';
            break;
        case "03d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
            break;
        case "03n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
            break;
        case "04d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
            break;
        case "04n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
            break;
        case "09d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
            break;
        case "09n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
            break;
        case "10d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-sun-rain"></i>'; 
            break;
        case "10n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-moon-rain"></i>';
            break;
        case "11d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
            break;
        case "11n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
            break;
        case "13d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
            break;
        case "13n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
            break;
        case "50d":
            weatherIcon.innerHTML = '<i class="fa-solid fa-smog"></i>';
            break;
        case "50n":
            weatherIcon.innerHTML = '<i class="fa-solid fa-smog"></i>';
            break;
        default:
            weatherIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
            break;
    }
    temperatureText.innerHTML = `${currentWeather.main.temp} °C`;
    weatherWMO.innerText = `${currentWeather.weather[0].main}`;
    wmoDescription.innerText = `${currentWeather.weather[0].description}`;
    feelsLike.innerText = `Sensação: ${currentWeather.main.feels_like} °C`;
    humidity.innerText = `Umidade: ${currentWeather.main.humidity} %`;
    windSpeed.innerText = `Vento: ${currentWeather.wind.speed} m/s`;
    cloudCover.innerText = `Cobertura: ${currentWeather.clouds.all} %`;
}

const changebackground = () => {

    let date = new Date();
    let hours = date.getHours();

    console.log(hours);

    switch (true) {
        case (19 < hours) || (hours < 6):
            mainbackground.style.backgroundImage = "linear-gradient(to top left, #3d0303, #000275)";
            break;
        case  (6 < hours) && (hours < 12):
            mainbackground.style.backgroundImage = "linear-gradient(to top left, #a85a5a, #ebda7f)";
            break;
        case  (12 < hours) && (hours < 16):
            mainbackground.style.backgroundImage = "linear-gradient(to top left, #777fa7, #ffc374)";
            break;
        case  (16 < hours) && (hours < 19):
            mainbackground.style.backgroundImage = "linear-gradient(to top left, #2b397e, #996f6b)";
            break;
        default:
            mainbackground.style.backgroundColor = "#000";
            break;
    }
        
}

getLocation();
changebackground();


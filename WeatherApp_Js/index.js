const userWeather = document.querySelector(" [data-userWeather] ");
const searchWeather = document.querySelector(" [data-searchWeather] ");
const grantLocationContainer = document.querySelector(
  "[data-grantLocationContainer]"
);
const mainContainer = document.querySelector("[data-mainContainer]")
const apiKey = "cb6c9399b6412548dc5342342cc28082";
const loading = document.querySelector("[data-loading]");
const searchBar = document.querySelector("[data-searchBar]");
const searchBarValue = document.querySelector("#search");

let granted = false;
var locationData;

function switchTab(newValue, oldValue) {
  newValue = document.querySelector(newValue);
  oldValue = document.querySelector(oldValue);
  newValue.style.backgroundColor = "rgb(148, 163, 184)";
  oldValue.style.backgroundColor = "transparent";
  mainContainer.style.display = "none";
  ifSearch();
}

searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.style.display = "flex";
  const cityName = searchBarValue.value;
  fetchWeatherUsingCityName(cityName);
});

function ifSearch() {
  if (searchWeather.style.backgroundColor == "rgb(148, 163, 184)") {
    searchBar.style.display = "flex";
    grantLocationContainer.style.display = "none";
  } else {
    searchBar.style.display = "none";
    if (granted === false) {
      grantLocationContainer.style.display = "flex";
    }
    if (locationData) {
      setValues(locationData);
    }
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  grantLocationContainer.style.display = "none";
  loading.style.display = "flex";
}

function successCallback(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetchweatherusinglocation(lat, lon);
  granted = true;
}

function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

async function fetchweatherusinglocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    locationData = data;
    setValues(data);
  } catch (e) {
    alert("Couldn't fetch weather data");
  }
}
async function fetchWeatherUsingCityName(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      alert(`Error fetching data for ${cityName}`);
    }
    const data = await res.json();
    setValues(data);
  } catch (e) {
    alert(`Error fetching data for ${cityName}`);
  }
}
function setValues(data) {
    mainContainer.style.display = "flex";
  const cityNameHeading = document.querySelector("[data-cityName]");
  const country = document.querySelector("[data-country]");
  const mainWeather = document.querySelector("[data-mainWeather]");
  const mainWeatherImage = document.querySelector("[data-mainWeatherImage]");
  const temp = document.querySelector("[data-temp]");
  const humidity = document.querySelector("[data-humidity]");
  const windSpeed = document.querySelector("[data-windSpeed]");
  const clouds = document.querySelector("[data-clouds]");
  loading.style.display = "none";
  console.log(data);
  cityNameHeading.innerText = data.name;
  country.src = `https://flagcdn.com/144x108/${data.sys.country.toLowerCase()}.png`;
  mainWeather.innerText = data.weather[0].description;
  mainWeather.innerText =
    mainWeather.innerText.charAt(0).toUpperCase() +
    mainWeather.innerText.slice(1);
  mainWeatherImage.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  humidity.innerText = `${data.main.humidity} %`;
  windSpeed.innerText = `${data.wind.speed} `
  clouds.innerText = `${data.clouds.all} %`;
  temp.innerText =`${data.main.temp} °C`;
}

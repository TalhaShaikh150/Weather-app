const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector(".temperature");
const weatherStatus = document.querySelector(".weather-status");
const weatherDetail = document.querySelector(".weather-detail");
const weatherImageElement = document.querySelector(".weather-img");
const feelsLikeTemp = document.querySelector(".feels-like-temp");
const uvIndex = document.querySelector(".uv-index");
const humidity = document.querySelector(".humidity");

//For Highlights Section

const wind = document.querySelector(".wind");
const visibility = document.querySelector(".visibility");
const pressure = document.querySelector(".pressure");
const dewPoint = document.querySelector(".dew-point");

//Previous Theme

let previosTheme = "";
//Api Code
const key = "5eccd56d9ce745919e2152215251307";
let city = "islamabad";

function fetchData() {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json/current.json?key=${key}&q=${city}&aqi=yes`
  )
    .then((res) => res.json())
    .catch(() => {})
    .then((data) => {
      // cityName.innerHTML = data.location.name;
      // countryName.innerHTML = data.location.country;
      // temperature.innerHTML = Math.round(data.current.temp_c) + "°";
      // weatherStatus.innerHTML = data.current.condition.text;
      // weatherDetail.innerHTML = data.current.condition.text;
      // feelsLikeTemp.innerHTML = Math.round(data.current.feelslike_c) + "°";
      // let weatherIcon = `${data.current.condition.text.toLowerCase()}`;

      // weatherImage.src = `assets/${weatherIcon}.png`;
      uvRaysRange(data);
      renderWeatherData(data);
      showWheatherImage(data);
      searchCity(data);
    });
}
fetchData();

function searchCity(data) {
  const searchCityInput = document.querySelector(".search-city-input");
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", () => {
    if (!searchCityInput.value) {
      alert("Please Fill The City Input");
      return;
    }
    city = searchCityInput.value;
    uvRaysRange(data);
    showWheatherImage(data);
    fetchData();
  });

  searchCityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (!searchCityInput.value) {
        alert("Please Fill The City Input");
        return;
      }
      uvRaysRange(data);
      showWheatherImage(data);
      city = searchCityInput.value;
      fetchData();
    }
  });
}

function renderWeatherData(data) {
  cityName.innerHTML = data.location.name;
  countryName.innerHTML = data.location.country;
  temperature.innerHTML = Math.round(data.current.temp_c) + "°";
  weatherStatus.innerHTML = data.current.condition.text;
  weatherDetail.innerHTML = data.current.condition.text;
  feelsLikeTemp.innerHTML = Math.round(data.current.feelslike_c) + "°";
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = Math.round(data.current.wind_kph) + " km/h";
  visibility.innerHTML = Math.round(data.current.vis_km) + " km/h";

  pressure.innerHTML = data.current.pressure_mb + " mb";
  dewPoint.innerHTML = data.current.dewpoint_c + "°";
}

function uvRaysRange(data) {
  let uv = data.current.uv;

  if (uv >= 0 && uv <= 2) {
    uvIndex.innerHTML = uv + " Low";
    uvIndex.style.color = "#c3b4b4";
  } else if (uv >= 3 && uv <= 5) {
    uvIndex.innerHTML = uv + " Moderate";
    uvIndex.style.color = "#e3b92d";
  } else if (uv >= 6 && uv <= 7) {
    uvIndex.style.color = "#ff3939ff";
    uvIndex.innerHTML = uv + " Very High";
  } else if (uv >= 8 && uv <= 11) {
    uvIndex.style.color = "#ea0d0dff";
    uvIndex.innerHTML = uv + " Extreme";
  }
}

function checkTheme(rootElement) {
  const themes = ["overcast", "rain", "thunder", "clear", "sunny"];
  themes.forEach((theme) => {
    if (rootElement.classList.contains(theme)) {
      rootElement.classList.remove(theme);
    }
  });
}

function showWheatherImage(data) {
  const rootElement = document.documentElement;
  checkTheme(rootElement);

  let conditionText = data.current.condition.text;
  let weatherImage = "default";
  if (conditionText === "Clear") {
    weatherImage = "clear.png";
    previosTheme = "clear";
    rootElement.classList.add(previosTheme);
  } else if (conditionText === "Sunny") {
    weatherImage = "sunny.png";
    previosTheme = "sunny";
    rootElement.classList.add(previosTheme);
  } else if (
    conditionText === "Partly Cloudy" ||
    conditionText === "Cloudy" ||
    conditionText === "Overcast"
  ) {
    previosTheme = "overcast";
    rootElement.classList.add(previosTheme);

    weatherImage = "cloudy.png";
  } else if (
    conditionText === "Mist" ||
    conditionText === "Fog" ||
    conditionText === "Freezing fog"
  ) {
    weatherImage = "fog.png";
    previosTheme = "overcast";
    rootElement.classList.add(previosTheme);
  } else if (
    conditionText === "Patchy rain possible" ||
    conditionText === "Patchy rain nearby" ||
    conditionText === "Patchy light rain" ||
    conditionText === "Light rain" ||
    conditionText === "Moderate rain at times" ||
    conditionText === "Moderate rain" ||
    conditionText === "Heavy rain at times" ||
    conditionText === "Heavy rain" ||
    conditionText === "Light rain shower" ||
    conditionText === "Moderate or heavy rain shower" ||
    conditionText === "Torrential rain shower"
  ) {
    weatherImage = "rain.png";
    previosTheme = "rain";
    rootElement.classList.add(previosTheme);
  } else if (
    conditionText === "Heavy rain at times" ||
    conditionText === "Heavy rain"
  ) {
    weatherImage = "heavy-rain.png";
    previosTheme = "thunder";
    rootElement.classList.add(previosTheme);
  } else if (
    conditionText === "Thundery outbreaks possible" ||
    conditionText === "Thundery outbreaks in nearby" ||
    conditionText === "Patchy light rain with thunder" ||
    conditionText === "Moderate or heavy rain with thunder" ||
    conditionText === "Patchy light snow with thunder" ||
    conditionText === "Moderate or heavy snow with thunder"
  ) {
    weatherImage = "thunder.png";
    previosTheme = "thunder";
    rootElement.classList.add(previosTheme);
  } else if (
    conditionText === "Patchy snow possible" ||
    conditionText === "Patchy light snow" ||
    conditionText === "Light snow" ||
    conditionText === "Patchy moderate snow" ||
    conditionText === "Moderate snow" ||
    conditionText === "Patchy heavy snow" ||
    conditionText === "Heavy snow" ||
    conditionText === "Light snow showers" ||
    conditionText === "Moderate or heavy snow showers" ||
    conditionText === "Blowing snow" ||
    conditionText === "Blizzard"
  ) {
    weatherImage = "snow.png";
  } else if (
    conditionText === "Patchy sleet possible" ||
    conditionText === "Light sleet" ||
    conditionText === "Moderate or heavy sleet" ||
    conditionText === "Light sleet showers" ||
    conditionText === "Moderate or heavy sleet showers" ||
    conditionText === "Ice pellets" ||
    conditionText === "Light showers of ice pellets" ||
    conditionText === "Moderate or heavy showers of ice pellets" ||
    conditionText === "Patchy freezing drizzle possible" ||
    conditionText === "Freezing drizzle" ||
    conditionText === "Heavy freezing drizzle" ||
    conditionText === "Light freezing rain" ||
    conditionText === "Moderate or heavy freezing rain"
  ) {
    weatherImage = "ice.png";
  } else if (
    conditionText === "Patchy light drizzle" ||
    conditionText === "Light drizzle"
  ) {
    weatherImage = "drizzle.png";
  }

  // Apply image
  weatherImageElement.src = `/assets/${weatherImage}`;
}

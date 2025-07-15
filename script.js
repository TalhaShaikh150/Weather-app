let previosTheme = "";

//Api Code
const key = "5eccd56d9ce745919e2152215251307";
let city = "karachi";

function fetchData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json/forecast.json?key=${key}&q=${city}&aqi=yes`
  )
    .then((res) => res.json())
    .catch(() => {})
    .then((data) => {
      renderCurrentWeather(data);
      renderWeatherHighlights(data);
      renderSunSet(data);
      uvRaysRange(data);
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
      city = searchCityInput.value;
      uvRaysRange(data);
      showWheatherImage(data);

      fetchData();
    }
  });
}

function renderCurrentWeather(data) {
  let timestampInSeconds = data.current.last_updated_epoch;
  const date = new Date(timestampInSeconds * 1000);

  let lastTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const currentWeather = document.querySelector(".current-weather");
  currentWeather.innerHTML = `
          <div class="card-header">
            <div class="card-header-left">
              <img src="assets/location.png" class="location-marker" alt="" />
              <div>
                <h3 class="city-name">${data.location.name}</h3>
                <p class="country-name">${data.location.country}</p>
              </div>
            </div>
            <div class="card-header-right">
              <p class="last-update">Last Updated</p>
              <p class="last-time">${lastTime}</p>
            </div>
          </div>

          <!--Card-Mid Section-->
          <div class="card-mid-section">
            <!--Card-Mid Section-Left-->
            <div class="card-content-left">
              <h1 class="temperature">${
                Math.round(data.current.temp_c) + "°"
              }</h1>
              <h1 class="weather-status">${data.current.condition.text}</h1>
              <p class="weather-detail"></p>
            </div>
            <!--Card-Mid Section-Right-->
            <div class="card-content-right">
              <img class="weather-img" src="" alt="" />
            </div>
          </div>

          <!--Card-Bottom Section-->
          <div class="card-bottom-section">
            <div class="more-info feels-like-parent">
              Feels Like
              <p class="feels-like-temp">${
                Math.round(data.current.feelslike_c) + "°"
              }</p>
            </div>
            <div class="more-info">
              <span class="uv-index-parent">UV Index</span>

              <p class="uv-index"></p>
            </div>
            <div class="more-info humidity-parent">
              Humidity
              <p class="humidity">${data.current.humidity + "%"}</p>
            </div>
         `;
}

function renderWeatherHighlights(data) {
  const todayHighlights = document.querySelector(".today-highlights");
  todayHighlights.innerHTML = ` <div class="highlights-header">
          <img src="assets/highlights.png" class="highlights" alt="" />
          <p>Today's Highlights</p>
        </div>
        <div class="margin-top">
          <div class="highlights-info">
            <div class="highlights-inner">
              <img src="assets/wind.png" alt="" />
              <span> Wind </span>
            </div>
            <span class="wind">${
              Math.round(data.current.wind_kph) + " km/h"
            }</span>
          </div>
          <div class="highlights-info">
            <div class="highlights-inner">
              <img src="assets/visibility-blue.png" alt="" />
              <span> Visibility</span>
            </div>
            <span class="visibility">${
              Math.round(data.current.vis_km) + " km/h"
            }</span>
          </div>
          <div class="highlights-info">
            <div class="highlights-inner">
              <img src="assets/speed-red.png" alt="" />
              <span>Pressure</span>
            </div>
            <span class="pressure">${data.current.pressure_mb + " mb"}</span>
          </div>
          <div class="highlights-info">
            <div class="highlights-inner">
              <img src="assets/temp.png" alt="" />
              <span> Dew Point</span>
            </div>
            <span class="dew-point">${data.current.dewpoint_c + "°"}</span>
          </div>
        </div>`;
}

function renderSunSet(data) {
  const sunriseAndsunset = document.querySelector(".sunrise-sunset");
  sunriseAndsunset.innerHTML = ` <div class="sunrise-container">
        <img src="assets/sunrise.png" alt="" class="sunrise-img" />
        <div>
          <span>Sunrise</span>
          <p class="sunrise">${data.forecast.forecastday[0].astro.sunrise}</p>
        </div>
      </div>
      <div class="sunset-container">
        <img src="assets/sunset.png" alt="" class="sunset-img" />
        <div>
          <span>Sunset</span>
          <p class="sunset">${data.forecast.forecastday[0].astro.sunrise}</p>
        </div>
      </div>`;
}

function uvRaysRange(data) {
  const uvIndex = document.querySelector(".uv-index");

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
    uvIndex.style.color = "#ea4242ff";
    uvIndex.innerHTML = uv + " Extreme";
  }
}

function checkTheme(rootElement) {
  const themes = [
    "overcast",
    "rain",
    "thunder",
    "clear",
    "sunny",
    "snowy",
    "default",
  ];
  themes.forEach((theme) => {
    if (rootElement.classList.contains(theme)) {
      rootElement.classList.remove(theme);
    }
  });
}

function showWheatherImage(data) {
  const weatherImageElement = document.querySelector(".weather-img");

  const weatherDetail = document.querySelector(".weather-detail");

  const rootElement = document.documentElement;
  checkTheme(rootElement);
  let weatherMessage = "";

  let conditionText = data.current.condition.text;
  let weatherImage = "default";
  if (conditionText === "Clear") {
    weatherImage = "clear.png";
    previosTheme = "clear";
    rootElement.classList.add(previosTheme);
    weatherMessage = "☀️ Clear skies today. Enjoy the sunshine!";
  } else if (conditionText === "Sunny") {
    weatherImage = "sunny.png";
    previosTheme = "sunny";
    rootElement.classList.add(previosTheme);
    weatherMessage = "☀️ It's clear and sunny. A perfect day to be outdoors.";
  } else if (
    conditionText === "Mist" ||
    conditionText === "Partly cloudy" ||
    conditionText === "Partly Cloudy" ||
    conditionText === "Cloudy" ||
    conditionText === "Overcast"
  ) {
    previosTheme = "overcast";
    rootElement.classList.add(previosTheme);
    weatherImage = "cloudy.png";
    weatherMessage = "☁️ It's cloudy.enjoy The Weather.";
  } else if (conditionText === "Fog" || conditionText === "Freezing fog") {
    weatherImage = "fog.png";
    previosTheme = "overcast";
    rootElement.classList.add(previosTheme);
    weatherMessage = "🌫️ Drive carefully. Visibility is low due to fog.";
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
    weatherMessage =
      "🌦️ Rainy weather. Drive safely and watch for slippery roads.";

    rootElement.classList.add(previosTheme);
  } else if (
    conditionText === "Heavy rain at times" ||
    conditionText === "Heavy rain"
  ) {
    weatherImage = "heavy-rain.png";
    previosTheme = "thunder";
    rootElement.classList.add(previosTheme);
    weatherMessage =
      "🌧️ It's pouring! Stay indoors if possible and avoid waterlogged areas.";
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
    weatherMessage =
      "⚡ Stay indoors and avoid open areas during thunderstorms.";
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
    previosTheme = "snowy";
    rootElement.classList.add(previosTheme);
    weatherMessage = "🧊 It's freezing. Bundle up and keep warm.";
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
    previosTheme = "snowy";
    rootElement.classList.add(previosTheme);
    weatherMessage = "🧊 It's snowing. Bundle up and keep warm.";

    weatherImage = "ice.png";
  } else if (
    conditionText === "Patchy light drizzle" ||
    conditionText === "Light drizzle"
  ) {
    weatherImage = "drizzle.png";
    previosTheme = "rain";
    weatherMessage =
      "🌦️ Light drizzle outside. Keep an umbrella handy just in case.";

    rootElement.classList.add(previosTheme);
  } else {
    previosTheme = "default";

    rootElement.classList.add(previosTheme);
  }

  weatherDetail.innerHTML = weatherMessage;

  // Apply image
  weatherImageElement.src = `assets/${weatherImage}`;
}

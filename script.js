let previosTheme = "";

//Api Code
const key = "5eccd56d9ce745919e2152215251307";
let city = "karachi";

function fetchData() {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=8&aqi=no&alerts=no`
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
      renderHourlyForeCast(data);
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
              <h1 class="temperature">${Math.round(data.current.temp_c)}°</h1>
              <h1 class="weather-status">${data.current.condition.text}</h1>
              <p class="weather-detail"></p>
            </div>
          
            <div class="card-content-right">
              <img class="weather-img" src="" alt="" />
            </div>
          </div>


          <div class="card-bottom-section">
            <div class="more-info feels-like-parent">
              Feels Like
              <p class="feels-like-temp">${Math.round(
                data.current.feelslike_c
              )} °</p>
            </div>
            <div class="more-info">
              <span class="uv-index-parent">UV Index</span>

              <p class="uv-index"></p>
            </div>
            <div class="more-info humidity-parent">
              Humidity
              <p class="humidity">${data.current.humidity} %</p>
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
            <span class="wind">${Math.round(data.current.wind_kph)} km/h</span>
          </div>
          <div class="highlights-info">
            <div class="highlights-inner">
              <img src="assets/visibility-blue.png" alt="" />
              <span> Visibility</span>
            </div>
            <span class="visibility">${Math.round(data.current.vis_km)} km/h
          </div>
          <div class="highlights-info">
            <div class="highlights-inner">
              <img src="assets/speed-red.png" alt="" />
              <span>Pressure</span>
            </div>
            <span class="pressure">${data.current.pressure_mb} mb</span>
          </div>
          <div class="highlights-info">
            <div class="highlights-inner">
              <img src="assets/temp.png" alt="" />
              <span> Dew Point</span>
            </div>
            <span class="dew-point">${data.current.dewpoint_c}°</span>
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

function renderHourlyForeCast(data) {
  const foreCastContainer = document.querySelector(".daily-forecast-container");
  const hourlyForeCast = data.forecast.forecastday[0].hour;

  let currentHour = new Date().getHours();
  let allDayHours = hourlyForeCast.slice(currentHour + 1, currentHour + 12);

  let html = "";

  allDayHours.forEach((element) => {
    const { weatherImage } = getWeatherMeta(element.condition.text);

    let date = new Date(element.time.replace(" ", "T"));
    let time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    html += `
      <div class="daily-forecast">
        <p>${time}</p>
        <img src="assets/${weatherImage}" alt="" class="daily-forecast-img" />
        <p>${element.humidity}%</p>
        <p class="hourly-temperature">${Math.round(element.temp_c)}°</p>
        <p class="humidity">${element.condition.text}</p>
      </div>`;
  });

  foreCastContainer.innerHTML = html;
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
  const rootElement = document.documentElement;
  const weatherImageElement = document.querySelector(".weather-img");
  const weatherDetail = document.querySelector(".weather-detail");

  let conditionText = data.current.condition.text;

  let { weatherImage, theme, message } = getWeatherMeta(conditionText);

  rootElement.className = ""; // clear previous classes
  rootElement.classList.add(theme);
  weatherDetail.innerHTML = message;
  weatherImageElement.src = `assets/${weatherImage}`;
}
function getWeatherMeta(conditionText) {
  conditionText = conditionText.toLowerCase(); // 🔥 Normalize input

  let weatherImage = "cloudy.png";
  let theme = "default";
  let message = "";

  if (conditionText === "clear") {
    weatherImage = "clear.png";
    theme = "clear";
    message = "☀️ Clear skies today. Enjoy the sunshine!";
  } else if (conditionText === "sunny") {
    weatherImage = "sunny.png";
    theme = "sunny";
    message = "☀️ It's clear and sunny. A perfect day to be outdoors.";
  } else if (
    ["mist", "partly cloudy", "cloudy", "overcast", ,].includes(conditionText)
  ) {
    weatherImage = "cloudy.png";
    theme = "overcast";
    message = "☁️ It's cloudy. Enjoy the weather.";
  } else if (
    ["fog", "freezing fog", "partly cloudy", "cloudy"].includes(conditionText)
  ) {
    weatherImage = "fog.png";
    theme = "overcast";
    message = "🌫️ Drive carefully. Visibility is low due to fog.";
  } else if (
    [
      "patchy rain possible",
      "patchy rain nearby",
      "patchy light rain",
      "light rain",
      "moderate rain at times",
      "moderate rain",
      "heavy rain at times",
      "heavy rain",
      "light rain shower",
      "moderate or heavy rain shower",
      "torrential rain shower",
    ].includes(conditionText)
  ) {
    weatherImage = "rain.png";
    theme = "rain";
    message = "🌦️ Rainy weather. Drive safely and watch for slippery roads.";
  } else if (
    [
      "thundery outbreaks possible",
      "thundery outbreaks in nearby",
      "patchy light rain with thunder",
      "moderate or heavy rain with thunder",
      "patchy light snow with thunder",
      "moderate or heavy snow with thunder",
      "patchy light rain in area with thunder",
    ].includes(conditionText)
  ) {
    weatherImage = "thunder.png";
    theme = "thunder";
    message = "⚡ Stay indoors and avoid open areas during thunderstorms.";
  } else if (
    [
      "patchy snow possible",
      "patchy light snow",
      "light snow",
      "patchy moderate snow",
      "moderate snow",
      "patchy heavy snow",
      "heavy snow",
      "light snow showers",
      "moderate or heavy snow showers",
      "blowing snow",
      "blizzard",
    ].includes(conditionText)
  ) {
    weatherImage = "snow.png";
    theme = "snowy";
    message = "🧊 It's freezing. Bundle up and keep warm.";
  } else if (
    [
      "patchy sleet possible",
      "light sleet",
      "moderate or heavy sleet",
      "light sleet showers",
      "moderate or heavy sleet showers",
      "ice pellets",
      "light showers of ice pellets",
      "moderate or heavy showers of ice pellets",
      "patchy freezing drizzle possible",
      "freezing drizzle",
      "heavy freezing drizzle",
      "light freezing rain",
      "moderate or heavy freezing rain",
    ].includes(conditionText)
  ) {
    weatherImage = "ice.png";
    theme = "snowy";
    message = "🧊 It's snowing. Bundle up and keep warm.";
  } else if (
    ["patchy light drizzle", "light drizzle"].includes(conditionText)
  ) {
    weatherImage = "drizzle.png";
    theme = "rain";
    message = "🌦️ Light drizzle outside. Keep an umbrella handy just in case.";
  }

  return { weatherImage, theme, message };
}

const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector(".temperature");
const weatherStatus = document.querySelector(".weather-status");
const weatherDetail = document.querySelector(".weather-detail");
const weatherImage = document.querySelector(".weather-img");
const feelsLikeTemp = document.querySelector(".feels-like-temp");
const uvIndex = document.querySelector(".uv-index");
const humidity = document.querySelector(".humidity");

//For Highlights Section

const wind = document.querySelector(".wind");
const visibility = document.querySelector(".visibility");
const pressure = document.querySelector(".pressure");
const dewPoint = document.querySelector(".dew-point");

const key = "5eccd56d9ce745919e2152215251307";
let city = "karachi";

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
      searchCity(data);
      console.log(data);
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
    fetchData();
    uvRaysRange(data);
  });

  searchCityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (!searchCityInput.value) {
        alert("Please Fill The City Input");
        return;
      }
      city = searchCityInput.value;
      fetchData();
      uvRaysRange(data);
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
  // let weatherIcon = `${data.current.condition.text.toLowerCase()}`;

  // weatherImage.src = `assets/${weatherIcon}.png`;
  weatherImage.src = `${data.current.condition.icon}`;

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

function showWheatherImage() {
  if (data.current.condition.text == "sunny") {
  }
}

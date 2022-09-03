let now = new Date();

function dayOfWeek(dayIndex) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex] || "";
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

document.querySelector("#todaysDate").innerHTML = showDate();

let currentButton = document.querySelector("#back_to_current_city");
currentButton.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

function showDate() {
  return [`${dayOfWeek(now.getDay())} `, `${hour}:${minutes}`].join(" ");
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0fd0719178975f973227695c5ae18796";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function formatForcastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast-day">${formatForcastDate(forecastDay.dt)}</div>
      <img  
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt="icon"
        width="42"
      />
      <div class="forecast-temperatures">
        <span class="forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>/
        <span class="forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a221b0bc8a3d0f29a2938e05fc8d1784";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTempInputtedCity(response) {
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;

  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector(
    "#inputtedCity"
  ).innerHTML = `<strong>${response.data.name}</strong>`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "0fd0719178975f973227695c5ae18796";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTempInputtedCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity");
  searchCity(cityInputElement.value);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#inputtedCity");
  cityElement.innerHTML = `<strong>${response.data.name}</strong>`;
  //celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  getForecast(response.data.coord);
}

searchCity("Lviv");

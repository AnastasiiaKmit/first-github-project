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

function showDate() {
  //let date = now.getDate();
  //if (date < 10) {
  //date = `0${date}`;
  //}
  //let month = now.getMonth() + 1;
  //if (month < 10) {
  //month = `0${month}`;
  //}
  //let year = now.getFullYear();
  return [
    `${dayOfWeek(now.getDay())} `,
    `${hour}:${minutes}`,
    //`${date}/${month}/${year}`,
  ].join(" ");
}

document.querySelector("#todaysDate").innerHTML = showDate();

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
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "0fd0719178975f973227695c5ae18796";
  let units = "metric";
  let city = document.querySelector("#inputCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTempInputtedCity);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector(
    "h1"
  ).innerHTML = `<strong>${response.data.name}</strong>`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0fd0719178975f973227695c5ae18796";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#back_to_current_city");
currentButton.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

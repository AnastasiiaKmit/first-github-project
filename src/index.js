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
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = now.getFullYear();
  return [
    `${dayOfWeek(now.getDay())} `,
    `${hour}:${minutes}`,
    `${date}/${month}/${year}`,
  ].join(" ");
}

document.querySelector("#todaysDate").innerHTML = showDate();

function showTempInputtedCity(response) {
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
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

function showTempKyiv(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<strong>Kyiv</strong>`;
}

function changeToKyiv(event) {
  event.preventDefault();
  let apiKey = "0fd0719178975f973227695c5ae18796";
  let units = "metric";
  let apiUrlKyiv = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlKyiv).then(showTempKyiv);
}

let kyivCity = document.querySelector("#sendToKyiv");
kyivCity.addEventListener("click", changeToKyiv);

function showTempLondon(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data.weather[0].icon);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<strong>London</strong>`;
}

function changeToLondon(event) {
  event.preventDefault();
  let apiKey = "0fd0719178975f973227695c5ae18796";
  let units = "metric";
  let apiUrlLondon = `https://api.openweathermap.org/data/2.5/weather?q=London&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlLondon).then(showTempLondon);
}

let londonCity = document.querySelector("#sendToLondon");
londonCity.addEventListener("click", changeToLondon);

function showTempNewYork(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<strong>New York</strong>`;
}

function changeToNewYork(event) {
  event.preventDefault();
  let apiKey = "0fd0719178975f973227695c5ae18796";
  let units = "metric";
  let apiUrlNewYork = `https://api.openweathermap.org/data/2.5/weather?q=New+York&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlNewYork).then(showTempNewYork);
}

let newYorkCity = document.querySelector("#sendToNewYork");
newYorkCity.addEventListener("click", changeToNewYork);

function showTemperature(response) {
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

document.querySelector("#nextDate").innerHTML = dayOfWeek(now.getDay() + 1);
document.querySelector("#nextDate1").innerHTML = dayOfWeek(now.getDay() + 2);
document.querySelector("#nextDate2").innerHTML = dayOfWeek(now.getDay() + 3);
document.querySelector("#nextDate3").innerHTML = dayOfWeek(now.getDay() + 4);
document.querySelector("#nextDate4").innerHTML = dayOfWeek(now.getDay() + 5);
document.querySelector("#nextDate5").innerHTML = dayOfWeek(now.getDay() + 6);

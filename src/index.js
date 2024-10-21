import "./template.css";
import clearDay from "./assets/img/weather-icons/clear-day.png";
import clearNight from "./assets/img/weather-icons/clear-night.png";
import cloudy from "./assets/img/weather-icons/cloudy.png";
import fog from "./assets/img/weather-icons/fog.png";
import hail from "./assets/img/weather-icons/hail.png";
import partlyCloudyDay from "./assets/img/weather-icons/partly-cloudy-day.png";
import partlyCloudyNight from "./assets/img/weather-icons/partly-cloudy-night.png";
import rainSnowShowersDay from "./assets/img/weather-icons/rain-snow-showers-day.png";
import rainSnowShowersNight from "./assets/img/weather-icons/rain-snow-showers-night.png";
import rainSnow from "./assets/img/weather-icons/rain-snow.png";
import rain from "./assets/img/weather-icons/rain.png";
import showersDay from "./assets/img/weather-icons/showers-day.png";
import showersNight from "./assets/img/weather-icons/showers-night.png";
import sleet from "./assets/img/weather-icons/sleet.png";
import snowShowersDay from "./assets/img/weather-icons/snow-showers-day.png";
import snowShowersNight from "./assets/img/weather-icons/snow-showers-night.png";
import snow from "./assets/img/weather-icons/snow.png";
import thunderRain from "./assets/img/weather-icons/thunder-rain.png";
import thunderShowersDay from "./assets/img/weather-icons/thunder-showers-day.png";
import thunderShowersNight from "./assets/img/weather-icons/thunder-showers-night.png";
import thunder from "./assets/img/weather-icons/thunder.png";
import wind from "./assets/img/weather-icons/wind.png";

async function getWeatherFromApi(city = "Warszawa") {
  try {
    const weather = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=LNU6KDBHHJ4VX7EVPJTQ2E7XZ&contentType=json`,
    );
    const weatherJson = await weather.json();
    return weatherJson;
  } catch (error) {
    return { error, msg: "Something went wrong. Try again." };
  }
}

function getWeatherIcon(icon) {
  const weatherIcons = {
    "clear-day": clearDay,
    "clear-night": clearNight,
    cloudy: cloudy,
    fog: fog,
    hail: hail,
    "partly-cloudy-day": partlyCloudyDay,
    "partly-cloudy-night": partlyCloudyNight,
    "rain-snow-showers-day": rainSnowShowersDay,
    "rain-snow-showers-night": rainSnowShowersNight,
    "rain-snow": rainSnow,
    rain: rain,
    "showers-day": showersDay,
    "showers-night": showersNight,
    sleet: sleet,
    "snow-showers-day": snowShowersDay,
    "snow-showers-night": snowShowersNight,
    snow: snow,
    "thunder-rain": thunderRain,
    "thunder-rain-day": thunderShowersDay,
    "thunder-rain-night": thunderShowersNight,
    thunder: thunder,
    wind: wind,
  };

  return weatherIcons[icon] || null;
}

async function getCurrentWeather(weatherJson) {
  const city = weatherJson.address;
  const icon = getWeatherIcon(weatherJson.currentConditions.icon);
  const description = weatherJson.currentConditions.conditions;
  const currentTemp = weatherJson.currentConditions.temp;
  const feelsLike = weatherJson.currentConditions.feelslike;
  const windSpeed = weatherJson.currentConditions.windspeed;
  const humidity = weatherJson.currentConditions.humidity;
  const visibility = weatherJson.currentConditions.visibility;
  const hoursArrToday = weatherJson.days[0].hours;
  const currentHour = new Date().getHours();
  const hoursFilteredToday = hoursArrToday.filter((hourObject) => {
    const reformattedDatetime = hourObject.datetime
      .split("")
      .splice(0, 2)
      .join("");
    if (reformattedDatetime >= currentHour) return true;
    else return false;
  });

  const hoursArrTomorrow = weatherJson.days[1].hours;

  const hoursFilteredTomorrow = hoursArrTomorrow.filter((hourObject) => {
    const reformattedDatetime = hourObject.datetime
      .split("")
      .splice(0, 2)
      .join("");
    if (reformattedDatetime < currentHour) return true;
    else return false;
  });

  const hours24ArrFiltered = hoursFilteredToday.concat(hoursFilteredTomorrow);
  const hours24ArrFilteredAndMapped = hours24ArrFiltered.map((hour) => {
    return {
      dateTime: hour.datetime.slice(0, -2),
      icon: getWeatherIcon(hour.icon),
      temp: hour.temp,
    };
  });
  return {
    city,
    icon,
    description,
    currentTemp,
    feelsLike,
    windSpeed,
    humidity,
    visibility,
    hours24ArrFilteredAndMapped,
  };
}
async function getWeatherForecast(weatherJson) {
  function createDay(day) {
    const dateTime = day.datetime;
    const icon = getWeatherIcon(day.icon);
    const tempMax = day.tempmax;
    const tempMin = day.tempmin;
    return { dateTime, icon, tempMax, tempMin };
  }
  const currentDaysArr = weatherJson.days;
  const daysArr = [];
  for (let i = 0; i < 7; i++) {
    const day = createDay(currentDaysArr[i]);
    daysArr.push(day);
  }
  return daysArr;
}
// const weatherJson = await getWeatherFromApi();
// const currentWeather = await getCurrentWeather(weatherJson);
// console.log(currentWeather);
// const forecast = await getWeatherForecast(weatherJson);
// console.log(forecast);

const searchSubmit = document.querySelector("#search-submit");
async function handleSearchCity(event) {
  event.preventDefault();

  const citySearch = document.querySelector("#search-city");
  console.log(citySearch.value);
  const weatherJson = await getWeatherFromApi(citySearch.value);
  console.log(weatherJson);

  if (!weatherJson.error) {
    const currentWeather = await getCurrentWeather(weatherJson);
    console.log(currentWeather);
    const forecast = await getWeatherForecast(weatherJson);
    console.log(forecast);
    generateMainContainer();
    fillChosenContainerWithMetricData(currentWeather);

    generateWeekForecastContainer();
    fillForecastContainerWithMetricData(forecast);
  } else {
    console.log(weatherJson.msg);
  }
}
searchSubmit.addEventListener("click", handleSearchCity);

function generateMainContainer() {
  const main = document.querySelector("main");
  const mainContent = ` 
  <div class="chosen-city-container">
      <div class="top-container">
        <h2></h2>
        <div class="date-today">
          <div class="date-today-top"><p></p></div>
          <div class="date-today-bottom"><p></p></div>
        </div>
      </div>

      <div class="temp-container">
        <div class="icon-container">
          <img />
          <p></p>
        </div>
        <div class="temp-wrapper">
         <div class="day-temp"><h3></h3></div>
        <div class="day-feelslike-temp"><h3></h3></div>
        </div>
        
       
      </div>
      <div class="more-data-container">
        <div class="wind">
          <p></p>
        </div>
        <div class="humidity">
          <p></p>
        </div>
        <div class="visibility">
          <p></p>
        </div>
      </div>
      <div class="hours-forecast">
        <button class="previous"><</button>
        <div class="hours-wrapper">
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        <div class="hour-container">
          <p class="hour"></p>
          <img src="" alt="" />
          <p class="temp"></p>
        </div>
        </div>
        <button class="next">></button>
      </div>
    </div>
         `;
  main.innerHTML = mainContent;
}
function fillChosenContainerWithMetricData(weatherJson) {
  const city = document.querySelector("main .top-container h2");
  city.textContent = weatherJson.city;

  // dates to do
  const dateToday = document.querySelector("date-today-top p");
  const currentHour = document.querySelector("date-today-bottom p");
  // icon to do
  const icon = document.querySelector(".icon-container img");
  icon.src = weatherJson.icon;
  const iconDescription = document.querySelector(".icon-container p");
  iconDescription.textContent = weatherJson.description;

  const dayTemp = document.querySelector(".temp-container .day-temp h3");
  dayTemp.textContent = `${weatherJson.currentTemp}°C`;

  const feelsLike = document.querySelector(
    ".temp-container .day-feelslike-temp h3",
  );
  feelsLike.textContent = `${weatherJson.feelsLike}°C`;
  const wind = document.querySelector(".wind p");
  wind.textContent = `Wind: ${weatherJson.windSpeed} km/h`;

  const humidity = document.querySelector(".humidity p");
  humidity.textContent = `Humidity: ${weatherJson.humidity}%`;

  const visibility = document.querySelector(".visibility p");
  visibility.textContent = `Visibility: ${weatherJson.visibility} km`;

  const hoursHourNodeList = document.querySelectorAll(".hour-container .hour");
  const hoursImgNodeList = document.querySelectorAll(".hour-container img");
  const hoursTempNodeList = document.querySelectorAll(".hour-container .temp");

  const hoursHourArr = [...hoursHourNodeList];
  const hoursImgArr = [...hoursImgNodeList];
  const hoursTempArr = [...hoursTempNodeList];

  for (let i = 0; i < hoursHourArr.length; i++) {
    hoursHourArr[i].textContent =
      weatherJson.hours24ArrFilteredAndMapped[i].dateTime;
    // to do
    hoursImgArr[i].src = weatherJson.hours24ArrFilteredAndMapped[i].icon;
    hoursTempArr[i].textContent =
      `${weatherJson.hours24ArrFilteredAndMapped[i].temp}°C`;
  }
}
function generateWeekForecastContainer() {
  const main = document.querySelector("main");
  const weekForecast = document.createElement("div");
  weekForecast.classList.add("week-forecast-container");
  weekForecast.innerHTML = `
      <h2></h2>
      <div class="week-container">
        <h3></h3>
        <img src="" alt="">
        <p class="max-temp"></p>
        <p class="min-temp"></p>
      </div>
      <div class="week-container">
        <h3></h3>
        <img src="" alt="">
        <p class="max-temp"></p>
        <p class="min-temp"></p>
      </div>
      <div class="week-container">
        <h3></h3>
        <img src="" alt="">
        <p class="max-temp"></p>
        <p class="min-temp"></p>
      </div>
      <div class="week-container">
        <h3></h3>
        <img src="" alt="">
        <p class="max-temp"></p>
        <p class="min-temp"></p>
      </div>
      <div class="week-container">
        <h3></h3>
        <img src="" alt="">
        <p class="max-temp"></p>
        <p class="min-temp"></p>
      </div>
      <div class="week-container">
        <h3></h3>
        <img src="" alt="">
        <p class="max-temp"></p>
        <p class="min-temp"></p>
      </div>
      <div class="week-container">
        <h3></h3>
        <img src="" alt="">
        <p class="max-temp"></p>
        <p class="min-temp"></p>
      </div>
    `;
  console.log(weekForecast);
  main.appendChild(weekForecast);
}
function fillForecastContainerWithMetricData(forecastJson) {
  // todo name of the week

  // todo icon path, still no icons selected

  const maxTempArr = [
    ...document.querySelectorAll(".week-container .max-temp"),
  ];
  const minTempArr = [
    ...document.querySelectorAll(".week-container .min-temp"),
  ];
  console.log(maxTempArr);
  for (let i = 0; i < 7; i++) {
    maxTempArr[i].textContent = `${forecastJson[i].tempMax}°C`;
    minTempArr[i].textContent = `${forecastJson[i].tempMin}°C`;
  }
}

import "./template.css";

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

async function getCurrentWeather(weatherJson) {
  const city = weatherJson.address;
  const icon = weatherJson.currentConditions.icon;
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
      icon: hour.icon,
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
    const icon = day.icon;
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
        <div class="day-temp"><h3></h3></div>
        <div class="day-fellslike-temp"><h3></h3></div>
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
  const iconDescription = document.querySelector(".icon-container p");
  iconDescription.textContent = weatherJson.description;

  const dayTemp = document.querySelector(".temp-container .day-temp h3");
  dayTemp.textContent = weatherJson.currentTemp;

  const feelsLike = document.querySelector(
    ".temp-container .day-fellslike-temp h3",
  );
  feelsLike.textContent = weatherJson.feelsLike;
  const wind = document.querySelector(".wind p");
  wind.textContent = weatherJson.windSpeed;

  const humidity = document.querySelector(".humidity p");
  humidity.textContent = weatherJson.humidity;

  const visibility = document.querySelector(".visibility p");
  visibility.textContent = weatherJson.visibility;

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
    // hoursImgArr[i].src = weatherJson.hours24ArrFilteredAndMapped[i].icon;
    hoursTempArr[i].textContent =
      weatherJson.hours24ArrFilteredAndMapped[i].temp;
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
    maxTempArr[i].textContent = forecastJson[i].tempMax;
    minTempArr[i].textContent = forecastJson[i].tempMin;
  }
}

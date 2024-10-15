import "./template.css";

async function getWeatherFromApi(city = "Warszawa") {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=LNU6KDBHHJ4VX7EVPJTQ2E7XZ&contentType=json`,
  );
  const weatherJson = await weather.json();
  return weatherJson;
}

async function getCurrentWeather(weatherJson) {
  const city = weatherJson.address;
  const icon = weatherJson.currentConditions.icon;
  const description = weatherJson.currentConditions.conditions;
  const currentTemp = weatherJson.currentConditions.temp;
  const feelsLike = weatherJson.currentConditions.feelslike;
  const windspeed = weatherJson.currentConditions.windspeed;
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
  return {
    city,
    icon,
    description,
    currentTemp,
    feelsLike,
    windspeed,
    humidity,
    visibility,
    hours24ArrFiltered,
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
  const currentWeather = await getCurrentWeather(weatherJson);
  console.log(currentWeather);
  const forecast = await getWeatherForecast(weatherJson);
  console.log(forecast);
}
searchSubmit.addEventListener("click", handleSearchCity);

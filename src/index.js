import "./template.css";
import {
  generateMainContainer,
  generateWeekForecastContainer,
  changeBackgroundColors,
} from "./dom";
import {
  getWeatherFromApi,
  getCurrentWeather,
  getWeatherForecast,
} from "./api";

import {
  fillChosenContainerWithMetricData,
  fillForecastContainerWithMetricData,
} from "./fillData";
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
    changeBackgroundColors(currentWeather);
  } else {
    console.log(weatherJson.msg);
  }
}
searchSubmit.addEventListener("click", handleSearchCity);

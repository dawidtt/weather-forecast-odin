export { getWeatherFromApi, getCurrentWeather, getWeatherForecast };

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
      dateTime: hour.datetime.slice(0, -3),
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
  function getDayOfWeek(datetime) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const index = new Date(datetime).getDay();
    return days[index];
  }
  function createDay(day) {
    const dateTime = getDayOfWeek(day.datetime);
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

import "./template.css";

async function getWeatherFromApi(city = "Warszawa") {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=LNU6KDBHHJ4VX7EVPJTQ2E7XZ&contentType=json`,
  );
  const weatherJson = await weather.json();
  console.log(weatherJson);
  return weatherJson;
}

async function getNecessaryWeather(weatherJson) {
  const icon = weatherJson.currentConditions.icon;
  const description = weatherJson.currentConditions.conditions;
  const currentTemp = weatherJson.currentConditions.temp;
  const feelsLike = weatherJson.currentConditions.feelslike;
  const windspeed = weatherJson.currentConditions.windspeed;
  const humidity = weatherJson.currentConditions.humidity;
  const visibility = weatherJson.currentConditions.visibility;
  const hoursArrToday = weatherJson.days[0];
  const currentHour = new Date().getHours();
  const hoursFilteredToday = hoursArrToday.filter((hourObject) => {
    const reformattedDatetime = hourObject.datetime
      .split("")
      .splice(0, 2)
      .join();
    if (reformattedDatetime >= currentHour) return true;
    else return false;
  });
  const hoursArrTomorrow = weatherJson.days[1];

  const hoursFilteredTomorrow = hoursArrTomorrow.filter((hourObject) => {
    const reformattedDatetime = hourObject.datetime
      .split("")
      .splice(0, 2)
      .join();
    if (reformattedDatetime < currentHour) return true;
    else return false;
  });
  const hours24ArrFiltered = hoursFilteredToday.concat(hoursFilteredTomorrow);
  return {
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
let weatherJson = getWeatherFromApi();
console.log(weatherJson);

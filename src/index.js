import "./template.css";

async function getWeatherFromApi(city = "Warszawa") {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=LNU6KDBHHJ4VX7EVPJTQ2E7XZ&contentType=json`,
  );
  const weatherJson = await weather.json();
  console.log(weatherJson);
  return weatherJson;
}

async function getNecessaryWeather(weatherJson) {}
getWeatherFromApi();

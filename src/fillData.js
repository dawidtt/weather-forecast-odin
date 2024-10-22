export {
  fillChosenContainerWithMetricData,
  fillForecastContainerWithMetricData,
};

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

    hoursImgArr[i].src = weatherJson.hours24ArrFilteredAndMapped[i].icon;
    hoursTempArr[i].textContent =
      `${weatherJson.hours24ArrFilteredAndMapped[i].temp}°C`;
  }
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

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
export {
  generateMainContainer,
  generateWeekForecastContainer,
  changeBackgroundColors,
};
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
        </div>
      </div>
           `;
  main.innerHTML = mainContent;
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

function changeBackgroundColors(weatherJson) {
  const hoursContainersNodeList = document.querySelectorAll(".hour-container");

  const hourContainers = [...hoursContainersNodeList];
  const tempContainer = document.querySelector(
    ".chosen-city-container .temp-container",
  );
  tempContainer.style = `background: ${
    chooseHourDependedBackground(new Date().getHours())[0]
  };
  background: linear-gradient(90deg, ${
    chooseHourDependedBackground(new Date().getHours())[0]
  } 0%, ${chooseHourDependedBackground(new Date().getHours())[1]} 70%, ${
    chooseHourDependedBackground(new Date().getHours())[2]
  } 90%);`;
  for (let i = 0; i < hourContainers.length; i++) {
    console.log(
      chooseHourDependedBackground(
        weatherJson.hours24ArrFilteredAndMapped[i].dateTime.slice(0, 2),
      ),
    );
    hourContainers[i].style.backgroundColor = chooseHourDependedBackground(
      weatherJson.hours24ArrFilteredAndMapped[i].dateTime.slice(0, 2),
    )[0];
  }
}
function chooseHourDependedBackground(hour) {
  const colors = [
    "#1B263B",
    "#243B55",
    "#3A517A",
    "#4A80B4",
    "#7AB4F5",
    "#8AC7FF",
    "#A5D9FF",
    "#7AB4F5",
    "#6099E0",
    "#4A80B4",
    "#3A517A",
    "#2B3C60",
  ];
  if (hour < 2) return [colors[0], colors[1], colors[2]];
  else if (hour < 4) return [colors[1], colors[2], colors[3]];
  else if (hour < 6) return [colors[2], colors[3], colors[4]];
  else if (hour < 8) return [colors[3], colors[4], colors[5]];
  else if (hour < 10) return [colors[4], colors[5], colors[6]];
  else if (hour < 12) return [colors[5], colors[6], colors[7]];
  else if (hour < 14) return [colors[6], colors[7], colors[8]];
  else if (hour < 16) return [colors[7], colors[8], colors[9]];
  else if (hour < 18) return [colors[8], colors[9], colors[10]];
  else if (hour < 20) return [colors[9], colors[10], colors[11]];
  else if (hour < 22) return [colors[10], colors[11], colors[0]];
  else return [colors[11], colors[0], colors[1]];
}

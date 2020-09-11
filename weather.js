let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);

  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units},us`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      init(result);
    });
}

function init(dataServer) {
  console.log(dataServer);
  switch (dataServer.weather[0].main) {
    case "clear sky":
      document.body.style.backgroundImage = "url('./pictures/clear.jpg')";
      break;
    case "Clear":
      document.body.style.backgroundImage = "url('./pictures/clear1.jpg')";
      break;
    case "Clouds":
      document.body.style.backgroundImage = "url('./pictures/cloudy.jpg')";
      break;
    case "light clouds":
      document.body.style.backgroundImage = "url('./pictures/cloudylight.jpg')";
      break;
    case "overcast clouds":
      document.body.style.backgroundImage = "url('./pictures/overcast1.jpg')";
      break;
    case "broken clouds":
      document.body.style.backgroundImage = "url('./images/broken-clouds.jpg')";
      break;
    case "Fog":
      document.body.style.backgroundImage = "url('./pictures/foggy.jpg')";
      break;
    case "Rain":
    case "Drizzle":
      document.body.style.backgroundImage = "url('./pictures/rainy.jpg')";
      break;
    case "Smoke":
      document.body.style.backgroundImage = "url('./pictures/smoke.jpg')";
      break;
    case "Mist":
      document.body.style.backgroundImage = "url('./pictures/mist.jpg')";
      break;
    case "Snow":
      document.body.style.backgroundImage = "url('./pictures/snowy.jpg')";
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = "url('./pictures/stormy.jpg')";
      break;
    default:
      document.body.style.backgroundImage = "url('./pictures/clear.jpg')";
      break;
  }
  console.log(dataServer.weather[0].main);

  let weatherDescriptionMain = document.getElementById(
    "weatherDescriptionMain"
  );
  let temperatureElement = document.getElementById("temperatureMain");
  let humidityElement = document.getElementById("humidity");
  let windElement = document.getElementById("wind");
  let cityName = document.getElementById("cityName");
  let weatherIcon = document.getElementById("iconImg");

  weatherIcon.src =
    "http://openweathermap.org/img/wn/" + dataServer.weather[0].icon + ".png";

  let resultDescription = dataServer.weather[0].description;
  weatherDescriptionMain.innerText = resultDescription.toUpperCase();

  temperatureElement.innerHTML =
    Math.floor(dataServer.main.temp) + " °C" + "...yeah";
  console.log(temperatureElement);
  windElement.innerHTML =
    "Wind blows at " + Math.floor(dataServer.wind.speed) + " mph" + "...wohoo";
  console.log(windElement);
  cityName.innerHTML = dataServer.name;
  humidityElement.innerHTML =
    "Humidity is by " + dataServer.main.humidity + "% ";
  console.log(humidityElement);

  setPositionWeatherBox();
}

function setPositionWeatherBox() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("searchButton").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});

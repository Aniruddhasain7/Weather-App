
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIKey = "6f3a5f6e6cd3e0e4b77f9322100f001e"; 
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        notFound.classList.add("active");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const description = document.querySelector(".weather-box .description");
      const temperature = document.querySelector(".weather-box .temperature");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        notFound.classList.remove("active");
       

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;
          case "Clouds":
            image.src = "images/cloud.png";
            break;
          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Mist":
            image.src = "images/mist.png";
            break;
          case "Haze":
            image.src = "images/mist.png";
            break;
          default:
            image.src = "images/cloud.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const elcloneinfoWeather = infoWeather.cloneNode(true);
        const elcloneinfoHumidity = infoHumidity.cloneNode(true);
        const elcloneinfoWind = infoWind.cloneNode(true);

        elcloneinfoWeather.id = "clone-Info-Weather";
        elcloneinfoWeather.classList.add("active-clone");
        elcloneinfoHumidity.id = "clone-Info-Humidity";
        elcloneinfoHumidity.classList.add("active-clone");
        elcloneinfoWind.id = "clone-Info-Wind";
        elcloneinfoWind.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elcloneinfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elcloneinfoHumidity);
          infoWind.insertAdjacentElement("afterend", elcloneinfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll(".info-weather.active-clone");
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];
        const cloneInfoHumidity = document.querySelectorAll(".info-humidity.active-clone");
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];
        const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");
          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 2200);
        }
      }
    })
});

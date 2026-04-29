document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".container");
  const searchBtn = document.querySelector(".search-box button");
  const searchInput = document.querySelector(".search-box input");
  const notFound = document.querySelector(".not-found");
  const temperature = document.querySelector(".temperature");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".humidity .info-humidity span");
  const wind = document.querySelector(".wind .info-wind span");

  searchBtn.addEventListener("click", e => {
    e.preventDefault();

    const API_KEY = "your_api_key_here";

    const city = searchInput.value.trim();
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.cod !== 200) {
          notFound.classList.add("active");
          return;
        }

        container.classList.add("active");
        notFound.classList.remove("active");

        temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
      });
  });

  searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") searchBtn.click();
  });

});
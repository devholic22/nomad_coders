const API_KEY = "b2a5b6726b44e663c7bc1da9538fad44";

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector("#weather span:first-child");
      const weather = document.querySelector("#weather span:last-child");
      city.innerText = data.timezone;
      weather.innerText = `${data.current.weather[0].main} / ${data.current.temp} ℃`;
      console.log(data);
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

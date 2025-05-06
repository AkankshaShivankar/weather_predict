async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!location) {
    resultDiv.innerHTML = "<span class='error'>Please enter a location.</span>";
    return;
  }

  const apiKey = '9c918cc19bb04a86a12125903252904';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");
    const data = await response.json();
    window.location.href = `output.html?city=${encodeURIComponent(data.location.name)}`;
  } catch (error) {
    resultDiv.innerHTML = "<span class='error'>Error fetching weather. Please check the location.</span>";
    console.error(error);
  }
}

async function displayWeatherDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city');
  if (!city) {
    document.getElementById("cityName").innerText = "No City Selected";
    return;
  }

  const apiKey = "9c918cc19bb04a86a12125903252904";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("temperature").innerText = data.current.temp_c + " °C";
    document.getElementById("humidity").innerText = data.current.humidity + " %";
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("windSpeed").innerText = data.current.wind_kph + " km/h";
    document.getElementById("windDir").innerText = data.current.wind_dir;
    document.getElementById("cloudiness").innerText = data.current.cloud + " %";
    document.getElementById("cityName").innerText = `${data.location.name}, ${data.location.country}`;
  } catch (error) {
    alert("Unable to fetch weather data.");
    console.error(error);
  }
}


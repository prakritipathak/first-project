 let now = new Date();
      console.log(now);

      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[now.getDay()];
      console.log(day);

      let year = now.getFullYear();
      console.log(now.getFullYear());

      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let month = months[now.getMonth()];
      console.log(month);

      let date = now.getDate();
      console.log(now.getDate());

      let hours = now.getHours();
      if (hours < 10) hours = `0${hours}`;
      console.log(now.getHours());

      let minutes = now.getMinutes();
      if (minutes < 10) minutes = `0${minutes}`;
      console.log(now.getMinutes());

      let todayDateTime = document.querySelector("#todays-time-date");
      todayDateTime.innerHTML = `   <strong>${day}, ${month} ${date}, ${year} || ${hours}:${minutes}</strong> `;
      console.log(todayDateTime);

      // On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
      function searchCity(event) {
        event.preventDefault();
        let cityInput = document.querySelector("#city-input");
        let h1 = document.querySelector("h1");
        h1.innerHTML = `${cityInput.value}`;
        let city = `${cityInput.value}`;
        let unit = "metric";
        let apiKey = "674e329bcdb1dff7f09baa41eea23436";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
        axios.get(apiUrl).then(showTemperature);
      }

      let form = document.querySelector("#search-engine");
      form.addEventListener("submit", searchCity);

      function showTemperature(response) {
        console.log(response.data);
        console.log(response.data.main.temp);
        let currentTemperature = Math.round(response.data.main.temp);
        let realTemperature = document.querySelector("#real-temperature");
        realTemperature.innerHTML = `${currentTemperature}°C`;
      }

      //Bonus point : Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
      function showPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let unit = "metric";
        let apiKey = "674e329bcdb1dff7f09baa41eea23436";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

        axios.get(apiUrl).then(showCurrentLocationTemperature);
      }

      function showCurrentLocationTemperature(response) {
        console.log(response.data);
        console.log(response.data.main.temp);
        let temperature = Math.round(response.data.main.temp);
        let cityName = console.log(response.data.name);
        let currentLocationButton = document.querySelector(
          "#current-location-button"
        );
        currentLocationButton.innerHTML = `It is ${temperature}°C in current location:${response.data.name}`;
      }

      navigator.geolocation.getCurrentPosition(showPosition);
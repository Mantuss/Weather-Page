// Name: Raymon Bikram Basnyat
// University id: 2059640
// Prototype 3


// Variable declared for main_temperature, temperature_max, temperature_min.
// Later used in the conversion of celsius to fahreinheit and vise versa.
var tempcel, tempmax, tempmin;

// Triggering the function if the key "Enter" is pressed.
var search = document.getElementById("cityname");
search.addEventListener("keyup", function (event) {

  // 13 is the "Enter" key on the keyboard.
  if (event.keyCode === 13) {

    // Call the function if enter key is pressed.
    citySearched();

  }
});

// Getting the value of city from the search box.
// Main city name is obtained in this fucntion.
function citySearched() {
  // Getting value from search box (The default value of the search box is blackpool).
  var name = document.getElementById("cityname").value;
  var city = name;

  // Clearing the value of the search box at the end.
  document.getElementById('cityname').value = "";
  displayData(city);

}
citySearched();

// Function to convert Celcius to Fahrenheit and vise-versa.
function convert(indi) {
  // Getting values from html tags.
  // Default temperature will always be in celsius.
  // Html doms used to put the value in Html page.
  var tempm = document.getElementById("degree").innerHTML;
  var tempx = document.getElementById("temp-max").innerHTML;
  var tempn = document.getElementById("temp-min").innerHTML;

  // Splitting using degree.
  var degm = tempm.split("°");
  var degx = tempx.split("°");
  var degn = tempn.split("°");

  // Default indicator will be d(default) 
  // Default temperature will be in celsius.
  if (indi == 'd') {
    // Higlighting the selected temperature unit.
    document.getElementById("celsius").style.color = "darkgrey";
    document.getElementById("fahren").style.color = "white";
  }

  // If the user clicked fahrenheit.
  if (indi == 'f') {
    // If the data in html is not fahrenheit
    // If the data is in fahrenheit then it will keep on adding the temp value.
    if (degm[1] != "F") {
      // Converting celsius to fahrenheit.
      var farhm = (degm[0] * 1.8) + 32;
      var farhx = (degx[0] * 1.8) + 32;
      var farhn = (degn[0] * 1.8) + 32;

      // Getting the value to html.
      // Putting all the converted temperature value in html tags using innerHTML
      document.getElementById("degree").innerHTML = farhm.toFixed(0) + "&#176;F";
      document.getElementById("temp-max").innerHTML = farhx.toFixed(0) + "&#176;F";
      document.getElementById("temp-min").innerHTML = farhn.toFixed(0) + "&#176;F";

      // Higlighting the selected temperature unit.
      document.getElementById("fahren").style.color = "darkgrey";
      document.getElementById("celsius").style.color = "white";
    }
  }

  // If the user clicked celsius.
  else {
    // Getting the value to html.
    // Putting all the converted temperature value in html tags using innerHTML
    document.getElementById("degree").innerHTML = tempcel.toFixed(0) + "&#176;C";
    document.getElementById("temp-max").innerHTML = tempmax.toFixed(0) + "&#176;C";
    document.getElementById("temp-min").innerHTML = tempmin.toFixed(0) + "&#176;C";

    // Higlighting the selected temperature unit.
    document.getElementById("celsius").style.color = "darkgrey";
    document.getElementById("fahren").style.color = "white";
  }
}

// Function for getting last updated time.
// This function gets the difference between current time and the time stored in local storage.
function convert_time(pre_time) {
  var diff = Date.now() - pre_time;
  // Converting the difference into seconds.
  const lastUpdate = ((diff % 60000) / 1000).toFixed(0);
  return lastUpdate;
}

// All the weather conditions in the api data.
// Changing the weather icons based on the weather conditions.
// Clouds, Clear, Snow, Rain, Thunderstorm, Drizzle, Mist, Haze, Default. These are all the weather conditions
// Default Temperature conversion is also called here because this is the last peice of code being runned in this file.
function weather_icon(main) {
  // if the main weather condition is Clouds.
  if (main == "Clouds") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-clouds-fill"></i>';
  }

  // if the main weather condition is clear sky.
  else if (main == "Clear") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
  }

  // if the main weather condition is snow.
  else if (main == "Snow") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-snow"></i>';
  }

  // if the main weather condition is rain.
  else if (main == "Rain") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-cloud-rain-fill"></i>';
  }

  // if the main weather condition is thunderstorm. 
  else if (main == "Thunderstorm") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-cloud-lightning"></i>';
  }

  // if the main weather condition is drizzle.
  else if (main == "Drizzle") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-cloud-drizzle-fill"></i>';
  }

  // if the main weather condition is mist
  else if (main == "Mist") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-cloud-haze"></i>';
  }

  // if the main weather condition is haze
  else if (main == "Haze") {
    document.getElementById("icon").innerHTML = '<i class="bi bi-cloud-haze-1"></i>';
  }

  // making a default weather condition if none of the above is true
  else {
    document.getElementById("icon").innerHTML = '<i class="bi bi-cloud-slash-fill"></i>';
  }

  // Calling the convert function with default argument(d).
  convert('d');
}

// 
function data_fetch(city) {
  // Getting weather data from database.
  fetch("http://localhost/Weather_Page/Index.php?city=" + city)
    .then((outcome) => outcome.json())
    .then((outcome) => {

      // Getting information from object and asigning it to variables.
      const description = outcome["weather_desc"];
      const temp = parseInt(outcome["weather_temp"]);
      const temp_max = parseInt(outcome["temp_high"]);
      const temp_min = parseInt(outcome["temp_low"]);
      const humid = outcome["humidity"];
      const pressure = outcome["pressure"];
      const wind = outcome["weather_wind"];
      const main = outcome["weather_main"];
      const city = outcome["city"];
      const country = outcome["country"];

      // Converting the temperature values to celsius from kelvin.
      celtemp = (temp - 273.15);

      // asigining the main temperature to the variable
      tempcel = celtemp;

      // Converting the temperature values to celsius from kelvin.
      celtemp_max = (temp_max - 273.15);

      // asigining the main temperature to the variable
      tempmax = celtemp_max;

      // Converting the temperature values to celsius from kelvin.
      celtemp_min = (temp_min - 273.15);

      // asigining the main temperature to the variable
      tempmin = celtemp_min;

      // Inserting weather data into Html tags.
      document.getElementById("degree").innerHTML = Math.round(celtemp) + "&#176;C";
      document.getElementById("desc").innerHTML = description;
      document.getElementById("temp-max").innerHTML = Math.round(celtemp_max) + "&#176;C";
      document.getElementById("temp-min").innerHTML = Math.round(celtemp_min) + "&#176;C";
      document.getElementById("Humid").innerHTML = humid + " %";
      document.getElementById("wind").innerHTML = wind + " km/hr";
      document.getElementById("press").innerHTML = pressure + " pa";
      document.getElementById("loc").innerHTML = city + ", " + country;
      document.getElementById("seconds").innerHTML = "Last Updated " + 0 + " Seconds Ago";

      weather_icon(main);

      // creating an object to store all the data obtained from the database
      var inner = {};

      // creating key and inserting the value for the key.
      inner['main'] = main;
      inner['description'] = description;
      inner['temperature'] = Math.round(celtemp);
      inner['temp_min'] = Math.round(celtemp_min);
      inner['temp_max'] = Math.round(celtemp_max);
      inner['wind_speed'] = wind;
      inner['humidity'] = humid;
      inner['pressure'] = pressure;
      inner['country'] = country;
      inner['date'] = Date.now();

      // setting the item in local storage in JSON object
      localStorage.setItem(city, JSON.stringify(inner));

    });
  // Clearing the value of the search box at the end.
  document.getElementById('cityname').value = "";
}

/* 
  function used to check if the city is in the localstorage or not
  if the city is in the local storage then it check is the data is 
  10 second old or not. if the data is not 10 second old then it 
  takes the weather data from local storage and if the the data is
  older than 10 second then it takes the data from database and updates
  the local storage.
*/
function displayData(city) {
  // finding the length of the localstorage 
  var locallen = localStorage.length;
  // temporary value for the city
  var tempo = NaN;
  // indicator to check if the city is in local storage or not
  var indicator = NaN;

  // iterating through the localstorage to check if the city is in local storage or not 
  for (var i = 0; i < locallen; i++) {
    // if the city name matches the name in local storage
    if (localStorage.key(i).toLowerCase() == city.toLowerCase()) {
      // assigning the city name in the temporary 
      tempo = localStorage.key(i);
      // setting the indicator true
      indicator = true;
      //breaking out of the loop
      break;
    }
  }

  // if the city already exists in the local storage
  if (indicator) {
    // getting the JSON object from Local Storage 
    var object = JSON.parse(localStorage.getItem(tempo));
    if (parseInt(object['date']) + 10000 > Date.now()) {
      // getting all the value from local storage and putting it into HTML using html dom
      document.getElementById("seconds").innerHTML = "Last Updated " + convert_time(object['date']) + " Seconds Ago";
      document.getElementById("degree").innerHTML = object['temperature'] + "&#176;C";
      document.getElementById("desc").innerHTML = object['description'];
      document.getElementById("temp-max").innerHTML = object['temp_max'] + "&#176;C";
      document.getElementById("temp-min").innerHTML = object['temp_min'] + "&#176;C";
      document.getElementById("Humid").innerHTML = object['humidity'] + " %";
      document.getElementById("wind").innerHTML = object['wind_speed'] + " km/hr";
      document.getElementById("press").innerHTML = object['pressure'] + " pa";
      document.getElementById("loc").innerHTML = tempo + ", " + object['country'];

      // calling weather_icon with argument which is weather description
      weather_icon(object['main']);
    }

    else {
      // if the time in the local storage exceeds the mark of 10 seconds
      data_fetch(city);
    }

  }

  else {
    // if the city does not exist in the local Storage.
    data_fetch(city);
  }
}


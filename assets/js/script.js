var weatherKey = "&appid=dff97e676f389487cd5e3a16a8bd3463"
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="
var apiUrlParam = "&exclude=hourly,minutely&units=imperial"
var iconUrl = "http://openweathermap.org/img/wn/"
var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q="
var cityInputE1 = document.querySelector("#city");
var cityFormE1 = document.querySelector("#city-form");
var cityButtonsE1 = document.querySelector('#city-buttons');
var lat = 0
var long = 0
var savedCities = []
var currentWeatherE1 = document.querySelector('#current-weather')
var city = '';
var previousCitiesE1 = document.querySelector("#previous-cities");
var forecastEl = document.querySelector('#forecast');

var getLatLong = function(city){
   var thisApi =  geoApi + city + '&limit=1' + weatherKey;
   fetch(thisApi)
        .then(function(response){
            if (response.ok) {
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                    parseLatLong(data);
                });
            } else {
                console.log("error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("unable to connect");
        });
}

var parseLatLong = function(cityinfo) {
    if (cityinfo.length === 0) {
        currentWeatherE1.textContent = "No city found.";
        return;
      }
      lat = cityinfo[0].lat;
      long = cityinfo[0].lon;
      getWeather();
}

var formSubmitHandler = function (event){
    event.preventDefault();
    clearForecast();
    city = cityInputE1.value.trim();
    getLatLong(city);
}

var previousCityHandler = function (prevCity) {
    clearForecast();
    city = prevCity;
    getLatLong(city);
}

var clearForecast = function() { 
    while (forecastEl.firstChild) {  
        forecastEl.removeChild(forecastEl.firstChild);
    }
    while (currentWeatherE1.firstChild) {  
    currentWeatherE1.removeChild(currentWeatherE1.firstChild);
}}

var clearCities = function() { 
    while (previousCitiesE1.firstChild) {  
    previousCitiesE1.removeChild(previousCitiesE1.firstChild);
}}

var loadHistory = function() {
    for (let i = 0; i < savedCities.length; i++) {
        var pCityLi = document.createElement('li');
        pCityLi.setAttribute('class', 'previous-city-list');
        var pCity = document.createElement('p');
        pCity.setAttribute('class', 'previous-city')
        pCity.setAttribute('id', savedCities[i]);
        pCity.textContent=savedCities[i];
        pCityLi.append(pCity);
        previousCitiesE1.append(pCity);  
    }
    setList();
}

var loadcities = function() {
    savedCities = JSON.parse(localStorage.getItem("savedCities"));
    if (savedCities==null) {
        console.log("no previous searched cities");
    } else {
        loadHistory();
    }
}

var saveCity = function() {
    if (savedCities==null) {
        savedCities = [];
        savedCities.push(city);
      } else {
        savedCities.unshift(city);
      };
      localStorage.setItem("savedCities", JSON.stringify(savedCities));
      clearCities();
      loadcities();
}

var getWeather = function() {
    var thisApi = apiUrl + lat +"&lon=" + long + apiUrlParam + weatherKey;
    fetch(thisApi)
        .then(function(response){
            if (response.ok) {
                console.log(response);
                response.json().then(function(data){
                    displayCurrentWeather(data);
                    saveCity();
                    displayForecast(data.daily);
                });
            } else {
                console.log("error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("unable to connect");
        });
};

function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        dateFormat = '(' + mm + '/' + dd + '/' + yyyy + ')';
        return dateFormat;
}

var displayForecast = function(forecast) {
    let i = 0;
    while (i<5) {
        var newCard = document.createElement('div')
        newCard.setAttribute("class", 'forecast card col');
        var date = document.createElement('p');
        date.setAttribute('class', 'forecast-data');
        dateFormat = convertTimestamp(forecast[i].dt);
        date.textContent = dateFormat;
        newCard.append(date);
        var icon = document.createElement('img');
        icon.setAttribute('src', iconUrl + forecast[i].weather[0].icon + "@2x.png")
        newCard.append(icon);
        var currentTemp = document.createElement("div");
        currentTemp.textContent = "Temp: " + forecast[i].temp.day + " F";
        newCard.append(currentTemp);
        var currentWind = document.createElement("div");
        currentWind.textContent = "Wind: " + forecast[i].wind_speed + " MPH";
        newCard.append(currentWind);
        var currentHumid = document.createElement("div");
        currentHumid.textContent = "Humidity: " + forecast[i].humidity + " %";
        newCard.append(currentHumid);
        forecastEl.append(newCard);
        i++;
    };
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = '(' + mm + '/' + dd + '/' + yyyy + ')'; 

var displayCurrentWeather = function(weather) {
    console.log(weather);
    var currentCity = document.createElement("h3");
    currentCity.append(city);
    var currentIcon = document.createElement('img');
    currentIcon.setAttribute('src', iconUrl + weather.current.weather[0].icon + "@2x.png")
    currentCity.append(currentIcon);
    currentCity.append(today);
    currentWeatherE1.append(currentCity);
    var currentTemp = document.createElement("div");
    currentTemp.textContent = "Temp: " + weather.current.temp + " F";
    currentWeatherE1.append(currentTemp);
    var currentWind = document.createElement("div");
    currentWind.textContent = "Wind: " + weather.current.wind_speed + " MPH";
    currentWeatherE1.append(currentWind);
    var currentHumid = document.createElement("div");
    currentHumid.textContent = "Humidity: " + weather.current.humidity + " %";
    currentWeatherE1.append(currentHumid);
    var currentUVI = document.createElement("div");
    currentUVI.textContent = "UV Index: " + weather.current.uvi;
        if (weather.current.uvi <= 2 ){
            currentUVI.setAttribute('class', "low");
        } else if (weather.current.uvi <= 7) {
            currentUVI.setAttribute('class', "medium");
        } else {
            currentUVI.setAttribute('class', "high");
        }
    
    currentWeatherE1.append(currentUVI);
}

var setList = function() {
    document.querySelectorAll('.previous-city').forEach(item=> {
        item.addEventListener('click', 
        function (getID) {
            var prevCity = getID.target.id;
            console.log(prevCity);
            previousCityHandler(prevCity);
        })
    })
}

loadcities();
//event listeners
cityFormE1.addEventListener("submit", formSubmitHandler);

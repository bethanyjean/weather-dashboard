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

var getLatLong = function(city){
   var thisApi =  geoApi + city + '&limit=1' + weatherKey;
   fetch(thisApi)
        .then(function(response){
            if (response.ok) {
                console.log(response);
                response.json().then(function(data){
                    parseLatLong(data.items);
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
    var city = cityInputE1.value.trim();
    getLatLong(city);
}



var getWeather = function() {
    var thisApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + long + apiUrlParam + weatherKey;
    fetch(thisApi)
        .then(function(response){
            if (response.ok) {
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                });
            } else {
                console.log("error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("unable to connect");
        });
};



//event listeners
cityFormE1.addEventListener("submit", formSubmitHandler);
cityButtonsE1.addEventListener("click", cityClickHandler);
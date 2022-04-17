var weatherKey = "&appid=dff97e676f389487cd5e3a16a8bd3463"
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="
var apiUrlParam = "&exclude=hourly,minutely&units=imperial"
var iconUrl = "http://openweathermap.org/img/wn/"
var geoApi = "http://api.openweathermap.org/geo/1.0/direct?q="
var city = document.querySelector("#city");
var lat = 0
var long = 0
var savedCities = []


var getWeather = function() {
    var thisApi = "https://api.openweathermap.org/data/2.5/onecall?lat" + lat +"&lon=" + long + apiUrlParam + weatherKey;
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



getWeather();
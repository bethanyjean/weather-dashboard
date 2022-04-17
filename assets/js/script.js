var weatherKey = "&appid=dff97e676f389487cd5e3a16a8bd3463"
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?"
var apiUrlParam = "&exclude=hourly,minutely&units=imperial"
var iconUrl = "http://openweathermap.org/img/wn/"

var getWeather = function() {
    var thisApi = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04" + apiUrlParam + weatherKey;
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
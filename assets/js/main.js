var preHeader = "https://";
var cityName = "Austin";
var laterDaily = 'f13f92d637d2cd810aaf91d2dbc3a24d';
var wxOpenURL = preHeader + "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + laterDaily;

var getWeather = function() {
    fetch(wxOpenURL).then(function(response) {
            console.log("inside", reponse);
    });

    console.log("outside");
}
// DOM Elements
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var preHeader = "https://";
var cityName = "Austin";
var laterDaily = 'f13f92d637d2cd810aaf91d2dbc3a24d';
var wxOpenURL = preHeader + "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + laterDaily;

var getWeather = function() {
    fetch(wxOpenURL).then(function(response) {
        if(response.ok){
                return response.json();
            }else{
                alert("Could not find city");
            }
        }
    )}
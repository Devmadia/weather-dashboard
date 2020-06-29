// // DOM Elements
// var userFormEl = document.querySelector("#user-form");
// var nameInputEl = document.querySelector("#username");

var preHeader = "https://";
//var cityName = "Austin";
var laterDaily = 'f13f92d637d2cd810aaf91d2dbc3a24d';
var wxOpenURL = "api.openweathermap.org/data/2.5/weather?q="
var imperialUnits = "&units=imperial&appid=";

$("#search-button").on("click", function(){
    event.preventDefault();
    var cityName = $("#cityChoice").val();
    if(cityName === ''){ // user does not enter or pick a city
        alert("You must enter a city name!");
    }
    $("#cityChoice").val(""); // clears the field after user successfully enters a name, regardless if it is an actual city
    getWeather(cityName)
})


function getWeather(location) {
    fetch(preHeader + wxOpenURL + location + imperialUnits + laterDaily).then(function(response) {
        if(response.ok){
                return response.json();
            }else{
                alert("Unable to locate city.");
            }
        }
    )}
    
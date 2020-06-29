// // DOM Elements
// var userFormEl = document.querySelector("#user-form");
// var nameInputEl = document.querySelector("#username");
// user selection of cities searched
var searchList = [];

var preHeader = "https://";
//var cityName = "Austin";
var laterDaily = 'f13f92d637d2cd810aaf91d2dbc3a24d';
var wxOpenURL = "api.openweathermap.org/data/2.5/weather?q="
var imperialUnits = "&units=imperial&appid=";

$("#search-button").on("click", function() {
    event.preventDefault();
    var cityName = $("#cityChoice").val();
    if(cityName === ''){ // user does not enter or pick a city
        alert("You must enter a city name!");
    }
    $("#cityChoice").val(""); // clears the field after user successfully enters a name, regardless if it is an actual city
    getWeather(cityName)
})

// creating the searched cities' list
function addCity(city){
    var listCity = $("<li>").addClass("list-group-item list-group-item-action").text(city);
    $("#history-list").append(listCity);
    saveCity(city);
}

// save searched cities to local storage for retrieval
function saveCity(city) {
    searchList.push(city);
    localStorage.setItem('userInput', JSON.stringify(searchList));
}

// load previously searched cities
function loadCity() {
    var storedCity = localStorage.getItem('userInput');
    storedCity = JSON.parse(storedCity);

    if(!storedCity){
        return false;
    }

    for(var i = 0; i < storedCity.length; i++) {
        addCity(storedCity[i]);
    }
}

function getWeather(location) {
    fetch(preHeader + wxOpenURL + location + imperialUnits + laterDaily)
        .then(function(response) {
            if(response.ok) {
                response.json()
                .then(function(response) {
                // add city to history list if not in list
                if(!searchList.includes(response.name)) {
                    addCity(response.name);
                } else {
                        alert("Unable to locate city.");
                }
                
                // display current weather
                $("#current-city")
                    .addClass("fetchedcolor")
                    .text(response.name + " (" + new Date().toLocaleDateString() + ") ");
                $("#temperature").text("Temperature: " + response.main.temp + "°F");
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#windSpeed").text("Wind speed: " + response.wind.speed + " MPH");

                // display 5 day forecast
                NAMENEEDEDTOGETFORECAST(location);
                })
            }
        });
    }

loadCity()
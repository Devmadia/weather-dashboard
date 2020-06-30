// collect cities searched for in an array to call on later for the city history list
var searchList = [];

// fixes the issue with the api not properly working in vs code live server
var preHeader = "https://";
var laterDaily = 'f13f92d637d2cd810aaf91d2dbc3a24d';
var wxOpenURL = "api.openweathermap.org/data/2.5/weather?q="
var imperialUnits = "&units=imperial&appid=";

// search button activation function
$("#search-button").on("click", function() {
    // cancels the event if it is cancelable
    event.preventDefault(); 
    var cityName = $("#cityChoice").val();
    if(cityName === ''){ // user does not enter or pick a city
        alert("You must enter a city name!");
    }
    $("#cityChoice").val(""); // clears the field after user successfully enters a name, regardless if it is an actual city
    getWeather(cityName)
})

// gathering the weater for searched city and storing city name in an array to call on later
function getWeather(location) {
    // retrieving information from weather api
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
                NAMENEEDEDTOGETFORECAST(location);  // need variable and function to call forecast for 5 days
                })
            }
        });
}

// creating the searched cities' list
function addCity(city){
    // introduces a list item element
    var listCity = $("<li>").addClass("list-group-item list-group-item-action").text(city);
    // adds the searched city to the ul with a class of history-list
    $("#history-list").append(listCity);
    saveCity(city);
}

// save searched cities to local storage for retrieval
function saveCity(city) {
    // adds new items to the end of an array and returns the new length
    searchList.push(city);
    // assigning saved cities under the key 'userInput' within the array called searchList
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

loadCity()
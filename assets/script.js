// Query Selectors & Variables
let APIKey = "50012762a1eb2a9ece8edda2d39d7fc2";
let searchButton = document.querySelector("#search-button");
let citySearchValue = document.querySelector("#city-search");

let searchHistory = $("#history");
let newCity = $("<li>");
newCity.addClass("list-group-item btn")

// Array
let cities = []


// Functions 
function findWeather() {
    let cityName = citySearchValue.value;
    cities.push(cityName)
    localStorage.setItem("city", JSON.stringify(cities));
    displayWeather()
}

function displayWeather() {
    let userCity = JSON.parse(localStorage.getItem("city"));
    newCity.text(userCity)
    searchHistory.prepend(newCity);
}

function renderCityButtons() {

    $("#history").empty();

    // Loops through the array of movies
    for (var i = 0; i < cities.length; i++) {

        let li = $("<li>");
        // Adds a class of movie to our button
        li.addClass("list-group-item btn")

        // Button text
        li.text(cities[i]);
        // Added the button to #history list
        $("#history").prepend(li);
    }
}


// On click saves input to local storage
$("#search-button").on("click", function (event) {
    event.preventDefault();

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchValue.value + "&appid=" + APIKey;
    console.log(queryURL)


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        let cityTemp = (response.main.temp-273.15)*1.8+32;
        let cityHumidity = response.main.humidity
        let cityWind = response.wind.speed

        let latitude = response.coord.lat
        let longitude = response.coord.lon
        let queryURLTwo = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;

         console.log(longitude)

        $.ajax({
            url: queryURLTwo,
            method: "GET"
        }).then(function (response) {

            console.log(response.value)

            let cityUV = response.value
            let u = $("<p>").text("UV Index: " + cityUV);
            $("#selectedCity").append(u)

            if (cityUV >= 0 && cityUV < 3){
                $(u).addClass("favorable")
            } else if (cityUV >=3 && cityUV < 8){
                $(u).addClass("moderate")
            } else if (cityUV >= 8){
                $(u).addClass("severe")
            }

        })


        let t = $("<p>").text("Temperature: " + cityTemp.toFixed(2));
        let h = $("<p>").text("Humidity: " + cityHumidity);
        let w = $("<p>").text("Wind Speed: " + cityWind);
        

        $("#cityDate").text(response.name + moment().format(" - MMM Do"));
        $("#selectedCity").html(t)
        $("#selectedCity").append(h)
        $("#selectedCity").append(w)
        

    });

    findWeather()
    renderCityButtons();
});


// AJAX 







// ------------------------------ Other code



 // let userCityInput = citySearchValue.value

// cities.push(userCityInput);


// Buttons
// $(document).on("click", "#search-button", findWeather);



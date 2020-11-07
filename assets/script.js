// Query Selectors & Variables
let APIKey = "50012762a1eb2a9ece8edda2d39d7fc2";
let searchButton = document.querySelector("#search-button");
let citySearchValue = document.querySelector("#city-search");

let searchHistory = $("#history");
// let newCity = $("<li>");
// newCity.addClass("list-group-item btn");

// Array
let cities = [];

// Functions 
function findWeather() {
    let cityName = citySearchValue.value;
    cities.push(cityName);
    localStorage.setItem("city", JSON.stringify(cities));
}


function renderNewButtons() {
    console.log("New Button")

    let userCityInput = citySearchValue.value
    console.log(userCityInput)
    // Loops through the array of movies
        let li = $("<li>");

        li.addClass("list-group-item btn");

        li.text(userCityInput);

        $("#history").prepend(li);
}


function renderCityButtons() {
    console.log("Something Happened!")

    let userCity = JSON.parse(localStorage.getItem("city"));
    console.log(userCity)

    if (JSON.parse(localStorage.getItem("city")) === null){
        return;
    }

    // Loops through the array of movies
    for (var i = 0; i < userCity.length; i++) {

        let li = $("<li>");

        li.addClass("list-group-item btn");

        li.text(userCity[i]);

        $("#history").prepend(li);
    }
}

renderCityButtons();



function generateWeatherData(city) {


    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL)

    // if (citySearchValue.value == "") {
    //     alert("You must enter a valid city name.");
    //     return false;
    // }

    // AJAX CALL 1
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#weatherCards").empty();

        console.log(response);

        let cityTemp = (response.main.temp - 273.15) * 1.8 + 32;
        let cityHumidity = response.main.humidity;
        let cityWind = response.wind.speed;

        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let queryURLTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=" + "minutely" + "&appid=" + APIKey;

        console.log(longitude);

        // Updates Current Weather Div 
        let t = $("<p>").text("Temperature: " + cityTemp.toFixed(1) + " \u00B0F");
        let h = $("<p>").text("Humidity: " + cityHumidity + "%");
        let w = $("<p>").text("Wind Speed: " + cityWind + "mph");

        $("#cityDate").text(response.name + moment().format(" - MMM Do"));
        $("#selectedCity").html(t);
        $("#selectedCity").append(h);
        $("#selectedCity").append(w);

        // AJAX Call 2 
        $.ajax({
            url: queryURLTwo,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            console.log(response.current.uvi);

            let cityUV = response.current.uvi;
            let u = $("<p>").text("UV Index: " + cityUV);
            
            $("#selectedCity").append(u)

            if (cityUV >= 0 && cityUV < 3) {
                $(u).addClass("favorable");
            } else if (cityUV >= 3 && cityUV < 8) {
                $(u).addClass("moderate");
            } else if (cityUV >= 8) {
                $(u).addClass("severe");
            }

            // Updates for 5 Day Forecast
            for (let i = 0; i < 5; i++) {

                let fiveTemp = (response.daily[i].temp.day - 273.15) * 1.8 + 32;
                let fiveHumidity = response.daily[i].humidity;
                let fiveDate = moment.unix(response.daily[i + 1].dt).format('l');

                let fiveT = $("<p>").text("Temp: " + fiveTemp.toFixed(1) + " \u00B0");
                let fiveH = $("<p>").text("Humid: " + fiveHumidity + "%");


                let newCard = $("<div>");
                let newCardHead = $("<div>");
                let cardBody = $("<div>");
                let iconDiv = $("<div>");
                let icon = $("<img>");
                let iconCode = response.daily[i].weather[0].icon
                let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

                icon.attr("src", iconUrl)
                newCard.addClass("col-sm-2 card text-white bg-primary mb-3");
                newCardHead.addClass("card-header");
                cardBody.addClass("card-body");


                newCard.append(cardBody);
                newCardHead.text(fiveDate);
                cardBody.html(fiveT);

                cardBody.prepend(iconDiv)
                iconDiv.append(icon)
                cardBody.append(fiveH);
                newCard.prepend(newCardHead);
                $("#weatherCards").append(newCard);

                console.log(response.daily[i].humidity)
                console.log(response.daily[i].temp.day)
                console.log(fiveDate)
            }

        });

        

    });

}

// On click saves input to local storage
function runCalls() {

    // $("#history").empty();
    // $("#selectedCity").empty();

    generateWeatherData(citySearchValue.value)
    findWeather();
    renderNewButtons();
};

$("#search-button").on("click", function (event) {
    event.preventDefault();
    runCalls()
});


// function loadSearchCity() {
//     $("#history").empty();
// }

$(document).on("click", ".list-group-item", function () {
    let newCityName = $(this).text();
    console.log(newCityName)

    generateWeatherData(newCityName)

});


// ------------------------------ Other code

// let userCityInput = citySearchValue.value

// cities.push(userCityInput);


// Buttons
// $(document).on("click", "#search-button", findWeather);

// -----was once at line 21-------
// function displayWeather() { 
//     // let userCity = JSON.parse(localStorage.getItem("city"));
//     // newCity.text(userCity);
//     // searchHistory.prepend(newCity);
// }

// ----- once at line 40
// renderLastSearch ()

// function renderLastSearch() {
//     let userCity = JSON.parse(localStorage.getItem("city"));
//     newCity.text(userCity);
// }

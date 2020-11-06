// Query Selectors 
let APIKey = "e4cea2cf502cc4322a8fb98afebebc62";
let searchButton = document.querySelector("#search-button");
let citySearchValue = document.querySelector("#city-search");

let searchHistory = document.querySelector("#history");
let newCity = $("<li>");



// Variables


// Functions 
function findWeather () {
    let cityName = citySearchValue.value;
    localStorage.setItem("city", JSON.stringify(cityName));
    displayWeather ()
}

function displayWeather () {
    JSON.parse(localStorage.getItem("city"));
    searchHistory.prepend(newCity);
}









// Prepend to search history
// newCity.textContent = citySearchValue.value
// searchHistory.prepend(newCity)




// AJAX 
// let queryURL = "api.openweathermap.org/data/2.5/weather?q=" + "citySearchValue" + "&appid=" + APIKey;


// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(updatePage); // need to write update page function 


// Buttons
$(document).on("click", "#search-button", findWeather);



// Query Selectors 



// Variables



// Functions 



// 




// AJAX 
let queryURL = "api.openweathermap.org/data/2.5/weather?q=" + "citySearchInput" + "&appid=" + APIKey;
let APIKey = "e4cea2cf502cc4322a8fb98afebebc62"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage); // need to write update page function 

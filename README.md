# Weather-Dashboard #



## Project Overview ##



## Screenshot ##
![Weather Dashboard Screenshot](https://user-images.githubusercontent.com/70240665/98490989-fe7ad180-21f8-11eb-98c6-19b995c44170.png)



## HTML Sample ##
```
<div class="col-sm-3 card">
                    <div id="expandHeader" class="card-header"><h5>City Search</h5></div>
                    <br>
                    <div id="explain">Search cities to find weather information.</div>
                    <br>
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" id="city-search" type="text" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" id="search-button" type="button">Search</button>
                    </form>
                    <br>

                    <div class="card" style="width: 18rem;">
                        <ul class="list-group list-group-flush" id="history">
                          
                        </ul>
                      </div>

                </div>
```

## JavaScript Sample ##
```
currentIconImg.attr("src", currentIconUrl)
        $("#cityDate").text(response.name + moment().format(" - MMM Do"));
        $("#cityDate").append(currentIconImg);
        $("#selectedCity").html(t);
        $("#selectedCity").append(h);
        $("#selectedCity").append(w);
```


## Deployed Application ##
https://jordonmoses.github.io/Weather-Dashboard/

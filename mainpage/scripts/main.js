var map;
var infowindow;
var service;

$("#searchButton").click(function () {
    initMap(($("#place").val()));
});

function initMap(place) {
    //declaring variables to match HTML elements
    var $placePhoto = $("#placePhoto");
    var $placeDetails = $("#placeDetails");
    var $addButtonDiv = $("#addButtonDiv");
    var addButton = document.createElement('button');
    addButton.textContent = "Add to List";
    addButton.className = ("myBtn");
    var img = document.createElement('IMG');
    //first position coordinates
    var myCoords = { lat: 29.7604, lng: -95.3698 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myCoords,
        zoom: 10
    });

    infowindow = new google.maps.InfoWindow();

    var request = {
        location: myCoords,
        radius: '100000',
        query: place
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }
    // creating the marker
    function createMarker(place) {
        // place attributes from the JSON resonse
        var photoUrl = place.photos[0].getUrl({ maxHeight: 400, maxWidth: 400 });
        var placeName = place.name;
        var placeAddress = place.formatted_address;
        var placeOpsHours = place.opening_hours;
        var placeRating = place.rating;
        var placeCost = place.price_level;
        if (placeCost == undefined) {
            placeCost = "Not available"
        }

        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        // google.map.event.addListener(marker, 'mouseover', function () {
        //     infowindow.setContent(place.name + " -- " + place.formatted_address);
        // });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name + "<p>" + place.formatted_address + "</p>");
            infowindow.open(map, this);
            console.log(place);
            // console.log(place.opening_hours);

            // create image and details and append to HTML page
            updatePlace(); //clears current places image if any
            setTimeout(function () {
                img.setAttribute('src', photoUrl);
                $placePhoto.append(img);
            }, 0);
            $placeDetails.append("<h3>" + placeName + "</h3>" +
                "<p>" + placeAddress + "</p>" +
                "<p>Hours: " + placeOpsHours + "</p>" +
                "<p>Rating: " + placeRating + "</p>" +
                "<p>Prices (out of 5): " + placeCost + "</p>");
            $addButtonDiv.append(addButton);
            // creating places object
            var myPlaces = {
                photoUrl,
                placeName,
                placeAddress,
                placeOpsHours,
                placeRating,
                placeCost,
            }
        });

    }//end createMarker()

} //end init() 

//share on facebook method - after share button is clicked
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//using weather API to display Houston's weather on the page header
(function () {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=Houston,Texas";
    var apiKey = "3b92e5adf9f23c51e324af64fe0242af";

    //with jQuery
    $.get(url + '&appid=' + apiKey).done(function (response) {
        console.log(response);
        responseSuccess(response);
    }).fail(function (error) {
        console.log(error);
        responseFailure();
    });
    // handle XHR success
    function responseSuccess(response) {
        var condition = response.weather[0].main;
        var degC = response.main.temp - 273.15;
        var degCInt = Math.floor(degC);
        var degF = degC * 1.8 + 32;
        var degFInt = Math.floor(degF);
        var $weatherBox = $('#result');
        $weatherBox.append("<h1>Houston</h1>" + "<p>" + degCInt + "&#176; C / " + degFInt + "&#176; F " + condition + "</p>");
    }
    // handle XHR error
    function responseFailure() {
        console.log("Error");
    }
})();

// this method updates the place
function updatePlace() {
    var $placePhoto = $("#placePhoto");
    var $placeDetails = $("#placeDetails");
    var $addButtonDiv = $("#addButtonDiv");
    while (placePhoto.firstChild) {
        placePhoto.removeChild(placePhoto.firstChild);
    }
    while (placeDetails.firstChild) {
        placeDetails.removeChild(placeDetails.firstChild);
    }
    while (addButtonDiv.firstChild) {
        addButtonDiv.removeChild(addButtonDiv.firstChild);
    }
}


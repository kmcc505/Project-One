var idArry = [];
// Initialize the map.
function initMap() {
    var fbButton = document.getElementById("fbButton");
    fbButton.setAttribute('data-href', window.location.href);
    var twButton = document.getElementById("twButton");
    fbButton.setAttribute('href', window.location.href);
    //calling the method that extracts the ID(s) form the page link (query string)
    getParams(window.location.href);
    //variables that correspond to the HTML elements
    var ListContainer = document.getElementById('ListContainer');
    //creating the map
    var myCoords = { lat: 29.7604, lng: -95.3698 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: myCoords
    });
    var service = new google.maps.places.PlacesService(map);
    var infowindow = new google.maps.InfoWindow;
    //looping through the array and rendering all saved places in myList
    idArry.forEach(function (e) {
        service.getDetails({
            placeId: e
        }, function (place, status) {
            //creating HTML elements dynamically
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                //place's photo container
                var photoUrl = place.photos[0].getUrl({ maxHeight: 400, maxWidth: 400 });
                var placePhotoDiv = document.createElement('div');
                placePhotoDiv.className = "col-lg-6";
                var img = document.createElement('img');
                //place's details container
                var placeDetailsDiv = document.createElement('div');
                placeDetailsDiv.className = "col-lg-6";
                var div = document.createElement('div');
                div.appendChild(placePhotoDiv);
                div.appendChild(placeDetailsDiv);
                div.className = "col-lg-12";
                ListContainer.appendChild(div);
                var br = document.createElement('br');
                ListContainer.appendChild(br);
                //print details and point the palce on the map
                setTimeout(function () {
                    img.setAttribute('src', photoUrl);
                    placePhotoDiv.appendChild(img);
                }, 0);
                var placeName = document.createTextNode(place.name);
                var placeAddress = document.createTextNode(place.formatted_address);

                var placeHours = [
                    "Sun: Opens " + place.opening_hours.periods[0].open.time + " - Closes " + place.opening_hours.periods[0].close.time,
                    "Mon: Opens " + place.opening_hours.periods[1].open.time + " - Closes " + place.opening_hours.periods[1].close.time,
                    "Tue: Opens " + place.opening_hours.periods[2].open.time + " - Closes " + place.opening_hours.periods[2].close.time,
                    "Wed: Opens " + place.opening_hours.periods[3].open.time + " - Closes " + place.opening_hours.periods[3].close.time,
                    "Thu: Opens " + place.opening_hours.periods[4].open.time + " - Closes " + place.opening_hours.periods[4].close.time,
                    "Fri: Opens " + place.opening_hours.periods[5].open.time + " - Closes " + place.opening_hours.periods[5].close.time,
                    "Sat: Opens " + place.opening_hours.periods[6].open.time + " - Closes " + place.opening_hours.periods[6].close.time
                ]

                var placeRating = document.createTextNode("Rating (out of 5) : " + place.rating);
                var placeCost = document.createTextNode("Cost (out of 5) : " + place.price_level);
                if (place.price_level == undefined) {
                    placeCost = "Cost is unavailable"
                }
                var brLines = [];
                for (var i = 0; i < 5; i++) {
                    brLines.push(document.createElement('br'));
                }
                placeDetailsDiv.append(placeName, brLines[0], placeAddress, brLines[1], placeRating, brLines[2],
                    placeCost, brLines[3]);
                placeDetailsDiv.append("Hours: ");
                var br = document.createElement('br');
                placeDetailsDiv.appendChild(br);
                for (var i = 0; i < placeHours.length; i++) {
                    placeDetailsDiv.append(placeHours[i]);
                    var br = document.createElement('br');
                    placeDetailsDiv.append(br);
                }

                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
            }
        });
    })

}

//extract all id(s) from the page URL
var getParams = function (url) {
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        idArry.push(decodeURIComponent(pair[1]))
    }
    //this is for deleting the last element added which is always undefined
    //this is caused due to having & then blank in the qeury string
    idArry.pop()
    return idArry;
};
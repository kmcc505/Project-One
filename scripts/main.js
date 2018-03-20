var map;
var infowindow;
var service;


function initMap(place) {
    var myCoords = { lat: 29.7604, lng: -95.3698 };

    $("#burger").click(function () {
        initMap('burger');
    });


    //creates the map on page and centers with zoom.
    map = new google.maps.Map(document.getElementById('map'), {
        center: myCoords,
        zoom: 5
    });

    infowindow = new google.maps.InfoWindow();

    var request = {
        location: myCoords,
        radius: '1000',
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
    // creating the markers 
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }


} //end init() 

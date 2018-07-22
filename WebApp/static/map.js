var map, infoWindow, pos
var markers = [];
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      displayAddress(pos['lat'], pos['lng']);

      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed. Please reload the page and allow location access when prompted' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function displayAddress(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
        if(results[1]) {
            //formatted address
            var address = results[0].formatted_address;
            document.getElementById('userloc').innerHTML = "Your Address: " + address;
        } else {
            document.getElementById('userloc').innerHTML = "Latitude: " + lat + " Longitude: " + lng;
        }
    } else {
        alert("Geocoder failed due to: " + status);
    }
  });
}

var service;
function Markers() {
  //clearMarkers();
  //Get user-selected category that will we search the area with
  var category;
  switch(document.getElementById('category').value){
    case "1":
      category = ['cafe', 'restaurant'];
    break;
    case "2":
      category = ['clothing_store', 'shopping_mall', 'department_store']
    break;
    case "3":
      category = ['movie_theater', 'movie_rental'];
    break;
    case "4":
      category = ['casino', 'bar', 'night_club', 'bowling alley'];
    break;
    case "5":
      category = ['spa', 'beauty_salon', 'hair_care'];
    break;
    case "6":
      category = ['campground', 'rv_park'];
    break;
    case "7":
      category = ['park'];
    break;
    case "8":
      category = ['amusement_park', 'aquarium', 'museum', 'stadium', 'zoo'];
    break;
    default:
      alert("Please select a valid category!");
    break;
  }
  if(!category){
    return;
  }

  var rad = Number(document.getElementById('radius').value)
  if(rad == NaN){
    alert("Please make sure that you are specifying a valid radius size using only numbers.");
    return;
  }

  var request;
  //Do the actual search query
  service = new google.maps.places.PlacesService(map);
  for (var i = 0; i < category.length; i++) {
    request = {
      location: pos,
      radius: rad,
      query: category[i]
    }
    console.log([category[i]])
    service.textSearch(request, callback);
    console.log(markers.length)
  }
}

//Callback function to submitting a google query
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      //Create markers for each nearby place and put them on our map
      createMarker(results[i]);
    }
  }
}

//Create markers on the map with our returned queries
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  //markers.push(marker);
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

/*function clearMarkers() {
  setMapOnAll(null);
  markers = [];
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}*/

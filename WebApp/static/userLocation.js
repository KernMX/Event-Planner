var geocoder;
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
} else {
  alert("This App requires user location access to function properly, please reload the page and allow user location access.");
}

function geoError() {
    alert("Geocoder failed.");
}

function geoSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng);
}

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          if(results[1]) {
              //formatted address
              var address = results[0].formatted_address;
              document.getElementById('userloc').innerHTML = "Address: " + address;
          } else {
              alert("No results found");
          }
      } else {
          alert("Geocoder failed due to: " + status);
      }
    });
}

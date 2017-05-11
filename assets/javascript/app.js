$(document).ready(function() {
	$('select').material_select();
});

var userName = "";
var twitterHandle = "";
var dogName = "";
var dogBreed = "";
var dogTemp = "";
var dogAge = "";


$("#submit-info").on("click", function() {
	event.preventDefault();

	var dogTempDrop = $("#dog_temp");
	var dogAgeDrop = $("#dog_age");

	userName = $("#full_name").val().trim();
	twitterHandle = $("#twitter_handle").val().trim();
	dogName = $("#dog_name").val().trim();
	dogBreed = $("#dog_breed").val().trim();
	dogTemp = $("#dog_temp").val();
	dogAge = $("#dog_age").val();

	console.log("userName: "+userName);
	console.log("twitterHandle: "+twitterHandle);
	console.log("dogName: "+dogName);
	console.log("dogBreed: "+dogBreed);
	console.log("dogTemp: "+dogTemp);
	console.log("dogAge: "+dogAge);

	$("#mainContent").empty();
	$("#mainContent").addClass("map");

	initMap();
});





// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

function initMap() {
	map = new google.maps.Map(document.getElementById('mainContent'), {
		center: {lat: 40.712, lng: -74.0059},
		zoom: 8
	});
	infoWindow = new google.maps.InfoWindow;

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('You Are Here');
			infoWindow.open(map);
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	// add marker at click location
	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng);
		console.log("event: "+JSON.stringify(event));
	});
}


// for geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}



function placeMarker(location) {
	console.log("location: "+location);
    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });
}
      
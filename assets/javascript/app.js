// for materialize dropdowns
$(document).ready(function() {
	$('select').material_select();
});

// variables to store user info from form
var userName = "";
var twitterHandle = "";
var dogName = "";
var dogBreed = "";
var dogTemp = "";
var dogAge = "";

// on click function for form submit button
$("#submit-info").on("click", function() {
	event.preventDefault();

	// set user input to appropriate variables
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

	// empty mainContent div and append a div for the map to it
	$("#mainContent").empty();
	var mapDiv = $("<div>").attr("id", "map");
	$("#mainContent").append(mapDiv);

	// run function to display map
	googleMap.initMap();
});

// object to handle Google Maps API
var googleMap = {
	map: {},
	infoWindow: {},
	initMap: function() {
		// initial map
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.712, lng: -74.0059},
			zoom: 15
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
			placeYourMarker(event.latLng);
			console.log("event: "+JSON.stringify(event));
		});
	},
	// function to handle errors for geolocation
	handleLocationError: function(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
			'Error: The Geolocation service failed.' :
			'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
	},
	// function to place a marker
	placeYourMarker: function(location) {
		console.log("location: "+location);
		var yourMarker = new google.maps.Marker({
			position: location,
			map: map
		});
	},
}
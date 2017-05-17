var yourKey = "key=07e7adfc27bd9872413e0961018c8013&";
var baseURL = "https://api.petfinder.com/";
var reqType = "pet.find?";
var dogSearch = "animal=dog&";
var searchCount = "count=15&";
var searchLocation = "location=08801&";
var searchSex = "sex=F&"
var searchSize = "size=M&"
var searchAge = "age=Young&"
var format = "format=json";


var dogsReturned;
var shelterIDs = [];
var sheltersReturned = [];
var petCity = "";
var petZip = "";

// 
var fullURL = baseURL+reqType+dogSearch+searchCount+searchLocation
+searchSex+searchSize+searchAge+yourKey+format;
	


function renderDogs() {
	$.ajax({ 
		method: 'GET', 
		url: fullURL + '&callback=?', 
		dataType: 'json', 
		success: function(data) { 
			$("#listOfDogs").empty();
			var foundPet = data.petfinder.pets.pet
			dogsReturned = foundPet;
			// data.petfinder.pets.pet[0]
			for (var i = 0; i < foundPet.length; i++){
				var petContact = foundPet[i].contact
				// stores phone number to contact 
				// shelter for pet in variable
				var petDiv = $("<div>").attr("id", "petDiv");
				var petPhone = petContact.phone.$t
				// stores email to contact
				// shelter for pet in variable
				var petEmail = petContact.email.$t
				// stores city pet is located in a variable
				var petCity = petContact.city.$t
				// stores zip code of pet's city 
				// in a varible
				var petZip = petContact.zip.$t
				// stores age of pet in a variable
				var petAge = foundPet[i].age.$t
				// stores size of pet in a variable
				var petSize = foundPet[i].size.$t
				// stores name of pet in a variable
				var petName = foundPet[i].name.$t
				// stores gender of pet in a variable
				var petSex = foundPet[i].sex.$t


				// stores image of pet in a variable
				var p = $("<p>").text("Name: " + petName);
				var petImage = $("<img>");
				petImage.attr("src", foundPet[i].media.photos.photo[7].$t)
				petImage.attr("id", "pet-image")
				petDiv.append(p);
				petDiv.append(petImage);
				console.log(petImage);
				console.log(petName);
				$("#dogList").append(petDiv);
				// stores Shelter ID for pet in a variable 
				var petShelterID = foundPet[i].shelterId.$t
				if (shelterIDs.indexOf(petShelterID) === -1) {
					shelterIDs.push(petShelterID);
				}
			}
			var count = 0;
			for (var i = 0; i < shelterIDs.length; i++) {
			var shelterURL = baseURL+"shelter.get?"+yourKey+"id="+shelterIDs[i]+"&"+format;
			$.ajax({ 
				method: 'GET', 
				url: shelterURL + '&callback=?', 
				dataType: 'json', 
				success: function(data) {
					sheltersReturned.push(data.petfinder.shelter);
				}
			}).done(function() {
				count++;
				if (count == shelterIDs.length) {
					for (var i = 0; i < sheltersReturned.length; i++) {
						var location = {lat: Number(sheltersReturned[i].latitude.$t),
										lng: Number(sheltersReturned[i].longitude.$t)};
						var title = sheltersReturned[i].name.$t;
						var id = sheltersReturned[i].id.$t;
						googleMap.setMarker(location, title, id);
					}
				}
			});
			}
			console.log(dogsReturned);
			
		}
	});
}

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCZ5kHNolNVZx831g9c-2ivxTlCYoknJ0s",
	authDomain: "woofer-1494286449804.firebaseapp.com",
	databaseURL: "https://woofer-1494286449804.firebaseio.com",
	projectId: "woofer-1494286449804",
	storageBucket: "woofer-1494286449804.appspot.com",
	messagingSenderId: "138553844210"
};
firebase.initializeApp(config);
var database = firebase.database(); 



// for materialize dropdowns and modals
$(document).ready(function() {
	$('select').material_select();
  $('.modal').modal();
});

// variables to store user info from form

var zip = "";
// var dogBreed = "";
// var dogGender = "";
// var dogAge = "";
// var dogSize = "";


// on click function for form submit button
$("#submit-info").on("click", function() {
	event.preventDefault();

	// set user input to appropriate variables


	zip = $("#zip_code").val().trim();
	dogBreed = $("#dog_breed").val().trim();
	dogGender = $("#dog_gender").val();
	dogAge = $("#dog_age").val();
	dogSize = $("#dog_size").val();


	console.log("dogBreed: "+dogBreed);
	console.log("dogGender: "+dogGender);
	console.log("dogAge: "+dogAge);
	console.log("dogSize: "+dogSize);
	console.log("zipCode: " +zip);



	// empty mainContent div and append a div for the map to it
	$("#mainContent").empty();
	var mapDiv = $("<div>").attr("id", "map");
	$("#mainContent").append(mapDiv);

	// run function to display map
	googleMap.initMap();
	renderDogs();
});

// object to handle Google Maps API
var googleMap = {
	map: {},
	infoWindow: {},
	geocoder: null,
	// display map function
	initMap: function() {
		// initial map
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.712, lng: -74.0059},
			zoom: 15,
			gestureHandling: 'cooperative',
		});
/*
		infoWindow = new google.maps.InfoWindow;

		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};

				infoWindow.setPosition(pos);
				infoWindow.setContent('You Are Here');
				infoWindow.open(map);
				map.setCenter(pos);
			}, function() {
				googleMap.handleLocationError(true, infoWindow, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			googleMap.handleLocationError(false, infoWindow, map.getCenter());
		}
*/
		geocoder = new google.maps.Geocoder();
		googleMap.codeAddress();
/*
		// add marker at click location
		google.maps.event.addListener(map, 'click', function(event) {
			console.log("event: "+JSON.stringify(event));
			googleMap.placeYourMarker(event.latLng);
		});

		googleMap.playDates();
*/
		//googleMap.setMarker();
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
		var yourMarker = new google.maps.Marker({
			position: location,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: "assets/images/marker.png",
		});
	},
	// display markers for play dates
	setMarker: function(location, title, id) {
		console.log("setMarker ran");
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: "assets/images/marker.png",
			title: title,
			id: id,
		});
		marker.addListener('click', function() {
			console.log(marker.id);
			var shelterDogs = [];
			for (var i = 0; i < dogsReturned.length; i++) {
				if (marker.id == dogsReturned[i].shelterId.$t) {
					shelterDogs.push(dogsReturned[i]);
				}
			}
			console.log(shelterDogs);
		});
	},
	// function to display info about play date
	markerData: function(key) {
		database.ref("playDateLocations/playDates/"+key).once("value").then(function(snapshot) {
			$("#modalContent").empty();
			var playDateName = $("<h4>").html(snapshot.val().name);
			var playDateTwitterHandle = $("<p>").html(snapshot.val().twitterHandle);
			var playDateDogName = $("<h5>").html(snapshot.val().dogName);
			var playDateDogBreed = $("<p>").html("<strong>Breed:</strong> "+snapshot.val().dogBreed);
			var playDateDogAge = $("<p>").html("<strong>Age:</strong> "+snapshot.val().dogAge);
			var playDateDogTemp = $("<p>").html("<strong>Temperament:</strong> "+snapshot.val().dogTemp);
			$("#modalContent").append(playDateName)
							.append(playDateTwitterHandle)
							.append(playDateDogName)
							.append(playDateDogBreed)
							.append(playDateDogAge)
							.append(playDateDogTemp);
			$("#markerDataModal").modal("open");
		});
	},
	// function to change zip code to lat lng
	codeAddress: function() {
		geocoder.geocode( { 'address': zip}, function(results, status) {
			if (status == 'OK') {
				map.setCenter(results[0].geometry.location);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	},
	geoMarker: function() {
			geocoder.geocode( { 'address': petCity+" "+petZip}, function(results, status) {
			if (status == 'OK') {
				googleMap.placeYourMarker(results[0].geometry.location);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	},
}

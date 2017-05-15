

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


	
	// https://api.petfinder.com/pet.find?animal-dog&count=15&key=07e7adfc27bd9872413e0961018c8013&format=json
	var fullURL = baseURL+reqType+dogSearch+searchCount+searchLocation
	+searchSex+searchSize+searchAge+yourKey+format;
	$.ajax({ 
	  method: 'GET', 
	  url: fullURL + '&callback=?', 
	  dataType: 'json', 
	  success: function(data) { 
	    // console.log(data);
	    var x = JSON.stringify(data) 
	    $(".output").html(x); 
	    
	    // object for the first returned pet stored
	    // in a variable
		var foundPet = data.petfinder.pets.pet[0]
			// console.log("PET: " + foundPet)
		// stores contact object in a varible for easier
		// access
		var petContact = foundPet.contact
		// stores phone number to contact 
		// shelter for pet in variable
			console.log("------------------")
			console.log("--Location Info---")
		var petPhone = petContact.phone.$t
			console.log("PET PHONE: " + petPhone) 
		// stores email to contact
		// shelter for pet in variable
		var petEmail = petContact.email.$t
			console.log("PET EMAIL: " + petEmail) 
		// stores city pet is located in a variable
		var petCity = petContact.city.$t
			console.log("PET CITY: " + petCity)
		// stores zip code of pet's city 
		// in a varible
		var petZip = petContact.zip.$t
			console.log("PET ZIP: " + petZip)
			
		// stores age of pet in a variable
			console.log("-----Pet Info-----")
		var petAge = foundPet.age.$t
			console.log("PET AGE: " + petAge)
		// stores size of pet in a variable
		var petSize = foundPet.size.$t
			console.log("PET SIZE: " + petSize)
		// stores name of pet in a variable
		var petName = foundPet.name.$t
			console.log("PET NAME: " + petName)
		// stores gender of pet in a variable
		var petSex = foundPet.sex.$t
			console.log("PET SEX: " + petSex)
			
		// stores image of pet in a variable
		var petImage = foundPet.media.photos.photo[7].$t
			console.log("PET IMAGE: " + petImage)
		// stores Shelter ID for pet in a variable 
		var petShelterID = foundPet.shelterId.$t
			console.log("SHELTER ID: " + petShelterID)
			console.log("------------------")
		
		}

	  });

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

// database.set().push(){
//   "": ,
// }


// for materialize dropdowns and modals
$(document).ready(function() {
	$('select').material_select();
  $('.modal').modal();
});

// variables to store user info from form

var zip = "";
var dogBreed = "";
var dogGender = "";
var dogAge = "";
var dogSize = "";


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
		infoWindow = new google.maps.InfoWindow;

		// Try HTML5 geolocation.
		/*if (navigator.geolocation) {
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
		}*/

		geocoder = new google.maps.Geocoder();
		googleMap.codeAddress();

		// add marker at click location
		google.maps.event.addListener(map, 'click', function(event) {
			console.log("event: "+JSON.stringify(event));
			googleMap.placeYourMarker(event.latLng);
		});

		googleMap.playDates();
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
			icon: "assets/images/1494713807_dog.png",
		});
	},
	// display markers for play dates
	playDates: function(location) {
		database.ref("playDateLocations/playDates").once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var key = childSnapshot.key;
				var location = childSnapshot.val().location;

				var marker = new google.maps.Marker({
					position: location,
					map: map,
					animation: google.maps.Animation.DROP,
					icon: "assets/images/dogMarker.png",
					key: key
				});
				marker.addListener('click', function() {
					googleMap.markerData(marker.key);
				});				
			}); // end of childSnapshot
		}); // end of snapshot
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
}

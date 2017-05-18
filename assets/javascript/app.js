$(document).ready(function() {
	$('select').material_select();
  $('.modal').modal();
});
	

	var yourKey = "key=07e7adfc27bd9872413e0961018c8013&";
	var baseURL = "https://api.petfinder.com/";
	var reqType = "pet.find?";
	var dogSearch = "animal=dog&";
	var searchCount = "";
	var searchLocation = "";
	var searchSex = "";
	var searchSize = "size=M&";
	var searchAge = "age=Young&";
	var format = "format=json";

	var dogName = ""

	var dogAge = ""
	var dogGender = ""
	var dogSize = ""
	var dogPhone = ""
 	var dogEmail = ""

	var dogsReturned = []
	
	// 




function renderDogs() {

	var userCount = $("#search_limit").val();
	var searchCount = "count=" + userCount + "&";
	
	var userSex = $("#dog_gender").val();
	var searchSex = "sex="+ userSex + "&";

	var userSize = $("#dog_size").val()
	var searchSize = "size="+ userSize +"&";

	var userAge = $("#dog_age").val()
	var searchAge = "age=" + userAge  + "&"

	var userZip = $("#zip_code").val();
	var searchLocation = "location=" + userZip  + "&";

	var fullURL = baseURL+reqType+dogSearch+searchCount+searchLocation
	+searchSex+searchSize+searchAge+yourKey+format;
	$.ajax({ 
	  method: 'GET', 
	  url: fullURL + '&callback=?', 
	  dataType: 'json', 
	  success: function(data) { 
	    
	    console.log(data)
	    $("#listOfDogs").empty();
	    
		var foundPet = data.petfinder.pets.pet
			// data.petfinder.pets.pet[0]
			for (var i = 0; i < foundPet.length; i++){
				var petContact = foundPet[i].contact
			// stores phone number to contact 
			// shelter for pet in variable
			
			dogsReturned.push(foundPet)
			
			var petContact = foundPet[i].contact

			var petDiv = $("<div>").attr("id", "petDiv");
			
			if (petContact.phone.hasOwnProperty("$t") ) {
				var petPhone = petContact.phone.$t
				
			} else {
				var petPhone = "No Phone Number Listed"
			}
			

			
				
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
			var foundPetMedia = foundPet[i].media
			
			
			var i = [i]
			
			
			if (foundPetMedia.hasOwnProperty("photos") ) {
				
				var foundPetImage = foundPetMedia.photos.photo[2].$t
			} else {
				var foundPetImage = "assets/images/No-image-found.jpg"
			}
			
			
			
			var petButton = $("<a>").text(petName);

			var petImage = $("<img>");
			

			petImage.attr("src", foundPetImage)
			


			petImage.attr("id", "pet-image")
			petImage.attr("alt", petName)
			petButton.addClass("waves-effect waves-light btn")
			petButton.attr("id", "pet-info")
			petButton.attr("href", "#modal"+ i)
			petImage.attr("href", "#modal"+ i)
			petImage.addClass("btn")
			
			
			// petDiv.append(p);
			petDiv.append(petImage);
			petDiv.append(petButton);
				 
				 
			petDiv.addClass("col lg3")
			 $("#dogList").append(petDiv);
			
			var modalDiv = $("<div>").attr("id", "modal"+i)
		
			modalDiv.addClass("modal")
			
			
			var modalContent = $("<div>").attr("id", "modalContent"+i)
			
			modalContent.addClass("modal-content")
			// modalContent.attr("id", "dog-"+i)

			var modalFooter = $("<div>")
			modalFooter.addClass("modal-footer")
			var modalA = $("<a>").text("Close")
			modalA.addClass("modal-action modal-close waves-effect waves-green btn-flat")
			modalFooter.append(modalA)
			modalDiv.append(modalContent)
			modalDiv.append(modalFooter)
			$("#modalContainer").append(modalDiv)
			
			var dogHeader = $("<h4>").html(petName);
			var dogAgeP = $("<p>").html("<strong>Age:</strong> "+ petAge);
			var dogGenderP = $("<p>").html("<strong>Gender:</strong> "+ petSex );
			var dogSizeP = $("<p>").html("<strong>Size:</strong> "+ petSize);
			var contactDog = $("<h5>").html("Contact Info");
			var dogPhoneP = $("<p>").html("<strong>Phone Number:</strong> "+ petPhone);
			var dogEmailP = $("<p>").html("<strong>Email:</strong> "+ petEmail);
			$("#modalContent"+i).append(dogHeader)
							.append(dogAgeP)
							.append(dogGenderP)
							.append(dogSizeP)
							.append(contactDog)
							.append(dogPhoneP)
							.append(dogEmailP)


			// stores Shelter ID for pet in a variable 
			var petShelterID = foundPet[i].shelterId.$t

			
			
			
			}	
		
		
		$('select').material_select();
  		$('.modal').modal();
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
	
	// dogBreed = $("#dog_breed").val().trim();
	// dogGender = $("#dog_gender").val();
	// dogAge = $("#dog_age").val();
 //  dogSize = $("#dog_size").val();


	// console.log("dogBreed: "+dogBreed);
	// console.log("dogGender: "+dogGender);
	// console.log("dogAge: "+dogAge);
 //  console.log("dogSize: "+dogSize);
 //  console.log("zipCode: " +zip);

 	renderDogs();
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
			icon: "assets/images/marker.png",
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
	// markerData: function(key) {
	// 	database.ref("playDateLocations/playDates/"+key).once("value").then(function(snapshot) {
	// 		$("#modalContent").empty();
	// 		var playDateName = $("<h4>").html(snapshot.val().name);
	// 		var playDateTwitterHandle = $("<p>").html(snapshot.val().twitterHandle);
	// 		var playDateDogName = $("<h5>").html(snapshot.val().dogName);
	// 		var playDateDogBreed = $("<p>").html("<strong>Breed:</strong> "+snapshot.val().dogBreed);
	// 		var playDateDogAge = $("<p>").html("<strong>Age:</strong> "+snapshot.val().dogAge);
	// 		var playDateDogTemp = $("<p>").html("<strong>Temperament:</strong> "+snapshot.val().dogTemp);
	// 		$("#modalContent").append(playDateName)
	// 						.append(playDateTwitterHandle)
	// 						.append(playDateDogName)
	// 						.append(playDateDogBreed)
	// 						.append(playDateDogAge)
	// 						.append(playDateDogTemp);
	// 		$("#markerDataModal").modal("open");
	// 	});
	// },
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


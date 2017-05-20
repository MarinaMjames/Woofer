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
	var userName = ""

	var dogAge = ""
	var dogGender = ""
	var dogSize = ""
	var dogPhone = ""
 	var dogEmail = ""

	var dogsReturned;
	var shelterIDs = [];
	var sheltersReturned = [];
	var shelterDogs = [];
	var clickedShelter;




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

		dogsReturned = foundPet;
			// data.petfinder.pets.pet[0]
			for (var i = 0; i < foundPet.length; i++){
				var petContact = foundPet[i].contact
			// stores phone number to contact 
			// shelter for pet in variable
			
			// blah blah blah
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
				var foundPetImage = "assets/images/no-image-found.gif"
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
			if (shelterIDs.indexOf(petShelterID) === -1) {
				shelterIDs.push(petShelterID);
			}
			
			
			
			}	
		
		
		$('select').material_select();
  		$('.modal').modal();
  		// get shelter info based off shelter id
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
				// display markers after ajax is done
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
		}


	  });

}
function shelterFilter() {
	$("#dogList").empty();
	$("#modalContainer").empty();
	var foundPet = shelterDogs
	// data.petfinder.pets.pet[0]
	for (var i = 0; i < foundPet.length; i++){
		var petContact = foundPet[i].contact
	// stores phone number to contact 
	// shelter for pet in variable
	
	
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
	
	var foundBreeds = foundPet[i].breeds.breed
			var petBreeds = ""
			
			if (foundBreeds instanceof Array) {
				var petBreeds = foundBreeds[0].$t
				console.log(petBreeds)
			} else {
				var petBreeds = foundBreeds.$t
			}	
	// stores gender of pet in a variable
	var petSex = foundPet[i].sex.$t
	var foundPetMedia = foundPet[i].media
	
	
	var i = [i]
	
	
	if (foundPetMedia.hasOwnProperty("photos") ) {
		
		var foundPetImage = foundPetMedia.photos.photo[2].$t
	} else {
		var foundPetImage = "assets/images/no-image-found.gif"
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
			var dogBreedP = $("<p>").html("<strong>Breed:</strong> "+ petBreeds);
			var dogAgeP = $("<p>").html("<strong>Age:</strong> "+ petAge);
			var dogGenderP = $("<p>").html("<strong>Gender:</strong> "+ petSex );
			var dogSizeP = $("<p>").html("<strong>Size:</strong> "+ petSize);
			var contactDog = $("<h5>").html("Contact Info");
			var dogPhoneP = $("<p>").html("<strong>Phone Number:</strong> "+ petPhone);
			var dogEmailP = $("<p>").html("<strong>Email:</strong> "+ petEmail);
			$("#modalContent"+i).append(dogHeader)
							.append(dogAgeP)
							.append(dogBreedP)
							.append(dogGenderP)
							.append(dogSizeP)
							.append(contactDog)
							.append(dogPhoneP)
							.append(dogEmailP)
	}
	$('select').material_select();
  		$('.modal').modal();
}

function favSearch(shelterID) {
	var fullURL = baseURL+"shelter.getPets?"+yourKey+"id="+shelterID+"&"+format;
	$.ajax({ 
	  method: 'GET', 
	  url: fullURL + '&callback=?', 
	  dataType: 'json', 
	  success: function(data) {
	  	console.log(data);
	    $("#listOfDogs").empty();
	    
		var foundPet = data.petfinder.pets.pet

		dogsReturned = foundPet;
			// data.petfinder.pets.pet[0]
			for (var i = 0; i < foundPet.length; i++){
				if (foundPet[i].animal.$t == "Dog") {
					var petContact = foundPet[i].contact
					// stores phone number to contact 
					// shelter for pet in variable
					
					
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
					if (shelterIDs.indexOf(petShelterID) === -1) {
						shelterIDs.push(petShelterID);
					}
				}
			}	
		
		
		$('select').material_select();
  		$('.modal').modal();
  		// get shelter info based off shelter id
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
				// display markers after ajax is done
				if (count == shelterIDs.length) {
					for (var i = 0; i < sheltersReturned.length; i++) {
						var location = {lat: Number(sheltersReturned[i].latitude.$t),
										lng: Number(sheltersReturned[i].longitude.$t)};
						var title = sheltersReturned[i].name.$t;
						var id = sheltersReturned[i].id.$t;
						googleMap.setMarker(location, title, id);
					}
				}
				zip = sheltersReturned[0].zip.$t;
				googleMap.codeAddress()
			});

			}
			
		}


	  }).done(function() {
	  	$("#favShelters").empty();
	  	// empty mainContent div and append a div for the map to it
		$("#mainContent").empty();
		var mapDiv = $("<div>").attr("id", "map");
		$("#mainContent").append(mapDiv);

		// run function to display map
		googleMap.initMap();
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

// database.set().push(){
//   "": ,
// }


// for materialize dropdowns and modals

// variables to store user info from form

var zip = "";

// on click function for form submit button
$("#submit-info").on("click", function() {
	event.preventDefault();

	// set user input to appropriate variables



	zip = $("#zip_code").val().trim();



 	renderDogs();
 	$("#favShelters").empty();
	// empty mainContent div and append a div for the map to it
	$("#mainContent").empty();
	var mapDiv = $("<div>").attr("id", "map");
	$("#mainContent").append(mapDiv);

	// run function to display map
	googleMap.initMap();
	
});

// object to handle Google Maps API
var googleMap = {
	infowindow: null,
	// display map function
	initMap: function() {
		// initial map
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.712, lng: -74.0059},
			zoom: 10,
			gestureHandling: 'cooperative',
		});


		googleMap.infowindow = new google.maps.InfoWindow();

		geocoder = new google.maps.Geocoder();
		googleMap.codeAddress();
	},
	// display markers for play dates
	setMarker: function(location, title, id) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			animation: google.maps.Animation.DROP,

			icon: "assets/images/1494713807_dog.png",

			icon: "assets/images/1494713807_dog.png",
			title: title,
			id: id,

		});
		marker.addListener('click', function() {
			clickedShelter = marker.id;
			for (var i = 0; i < sheltersReturned.length; i++) {
				var shelterID = sheltersReturned[i].id
					
				if (shelterID.$t == marker.id) {
					var street = sheltersReturned[i].address1.$t;
					if (street === undefined) {street = "";}
					var town = sheltersReturned[i].city.$t;
					var state = sheltersReturned[i].state.$t;
					var zipCode = sheltersReturned[i].zip.$t;
					var phone = sheltersReturned[i].phone
  					if (phone.hasOwnProperty("$t") ) {
				        var phone = phone.$t
				        
				    } else {
				        var phone = "No Phone Number Listed"
				    }
					var infowindowContent = "<h6><strong>"+sheltersReturned[i].name.$t+"</strong><h6>"
								+"<p><small>Address: "+street+" "+town+", "+state+" "+zipCode+"</small></p>"
								+"<p><small>Phone: "+phone+"</small></p>"
								+"<p><small>Email: "+sheltersReturned[i].email.$t+"</small></p>"
								+"<button id='"+marker.id+"' class='waves-effect waves-light btn'>Set as Favorite</button>";
				}
			}
			googleMap.infowindow.setContent(infowindowContent);
			googleMap.infowindow.setPosition(marker.position);
			googleMap.infowindow.open(map, marker);
			shelterDogs = [];
			for (var i = 0; i < dogsReturned.length; i++) {
				if (marker.id == dogsReturned[i].shelterId.$t) {
					shelterDogs.push(dogsReturned[i]);
				}
			}
			shelterFilter();
			$("#"+marker.id).on("click", favorites.setFavorite);
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


var favorites = {
	userFavorites: [],
	userKey: null,
	getKey: function() {
		favorites.userKey = localStorage.getItem("storedKey");
		if(!favorites.userKey) {
			favorites.userKey = database.ref("users").push().getKey();
			localStorage.setItem("storedKey", favorites.userKey);
		} else {
			favorites.getFavorites();
		}
	},
	getFavorites: function() {
		$("#favShelters").empty();
		database.ref("users/"+favorites.userKey).once("value", function(snapshot) {
			favorites.userFavorites = snapshot.val().shelters;
		}).then(function() {
			for (var i = 0; i < favorites.userFavorites.length; i++) {
				var shelterURL = baseURL+"shelter.get?"+yourKey+"id="+favorites.userFavorites[i]+"&"+format;
				$.ajax({ 
					method: 'GET', 
					url: shelterURL + '&callback=?', 
					dataType: 'json', 
					success: function(data) {
						var shelterDiv = $("<div>").attr("id", data.petfinder.shelter.id.$t).addClass("shelter col s3");
						var name = $("<h6>").html("<strong>"+data.petfinder.shelter.name.$t+"</strong>");
						var street = data.petfinder.shelter.address1.$t;
						if (street === undefined) {street = "";}
						var town = data.petfinder.shelter.city.$t;
						var state = data.petfinder.shelter.state.$t;
						var zipCode = data.petfinder.shelter.zip.$t;
						var address = $("<p>").html("<small>Address: "+street+" "+town+", "+state+" "+zipCode+"</small>");
						var phone = $("<p>").html("<small>Phone: "+data.petfinder.shelter.phone.$t+"</small>");
						var email = $("<p>").html("<small>Email: "+data.petfinder.shelter.email.$t+"</small>");
						var search = $("<button>").attr("id", data.petfinder.shelter.id.$t).addClass("favSearch waves-effect waves-light btn").html("Search Shelter");
						shelterDiv.append(name)
									.append(address)
									.append(phone)
									.append(email)
									.append(search);
						$("#favShelters").append(shelterDiv);
						$("#"+data.petfinder.shelter.id.$t).on("click", function() {
							var shelterID = $(this).attr("id");
							favSearch(shelterID);
						});
					}
				});
			}
		});
	},
	setFavorite: function() {
		var shelter = $(this).attr("id");
		if (favorites.userFavorites.indexOf(shelter) === -1) {
			if(favorites.userFavorites.length >= 4) {
				favorites.userFavorites.shift();
				favorites.userFavorites.push(shelter);
			} else {
				favorites.userFavorites.push(shelter);
			}
			database.ref("users/"+favorites.userKey).update({
				shelters: favorites.userFavorites
			});
			$("#"+shelter).replaceWith("<p class='red-text'>Favorite Set</p>");
		}
		$("#"+shelter).replaceWith("<p class='red-text'>Already a Favorite</p>");
	},
}
favorites.getKey();


var $scrolledText = $(".scrollingText");
var $word = $scrolledText.find("ul.words");
var $clonedList = $word.clone();

var listWidth = $word.find("li").length * 400;
var endPos = $scrolledText.width() - listWidth;

$word.add($clonedList).css({
	"width" : listWidth + "px"
});

$clonedList.addClass("cloned").appendTo($scrolledText);

//TimelineMax
var infinite = new TimelineMax({repeat: -1, paused: false});
var time = 15;

infinite.fromTo($word, time, {left:0}, {left: -listWidth, ease: Linear.easeNone}, 0);
infinite.fromTo($clonedList, time, {left:listWidth}, {left:0, ease: Linear.easeNone}, 0);
infinite.set($word, {left: listWidth});
infinite.to($clonedList, time, {left: -listWidth, ease: Linear.easeNone}, time);
infinite.to($word, time, {left: 0, ease: Linear.easeNone}, time);

 
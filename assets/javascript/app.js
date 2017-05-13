
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


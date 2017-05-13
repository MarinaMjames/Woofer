
	var yourKey = "key=07e7adfc27bd9872413e0961018c8013&";/*Insert Your Key*/
	var baseURL = "https://api.petfinder.com/";
var reqType = "pet.find?";
var params = "animal=dog&count=15&location=08801&";
var format = "format=json";


	
	// https://api.petfinder.com/pet.find?animal-dog&count=15&key=07e7adfc27bd9872413e0961018c8013&format=json
	var fullURL = baseURL+reqType+params+yourKey+format;
	$.ajax({ 
	  method: 'GET', 
	  url: fullURL + '&callback=?', 
	  dataType: 'json', 
	  success: function(data) { 
	    // console.log(data);
	    var x = JSON.stringify(data) 
	    $(".output").html(x); 
	    

		var foundPet = data.petfinder.pets.pet[0]
			// console.log("PET: " + foundPet)
		var petContact = foundPet.contact
		var petPhone = petContact.phone.$t
			console.log("PET PHONE: " + petPhone) 
		var petEmail = petContact.email.$t
			console.log("PET EMAIL: " + petEmail) 
		var petCity = petContact.city.$t
			console.log("PET CITY: " + petCity)
		var petZip = petContact.zip.$t
			console.log("PET ZIP: " + petZip)
		var petAge = foundPet.age.$t
			console.log("PET AGE: " + petAge)
		var petSize = foundPet.size.$t
			console.log("PET SIZE: " + petSize)
		var petName = foundPet.name.$t
			console.log("PET NAME: " + petName)
		var petSex = foundPet.sex.$t
			console.log("PET SEX: " + petSex)
		var petShelterID = foundPet.shelterId.$t
			console.log("SHELTER ID: " + petShelterID)} 
	  });


var queryURL = "https://api.giphy.com/v1/gifs/search?q=";

var publicKey = "&api_key=dc6zaTOxFJmzC";

var limitResults = "&limit=10";

var topics = ["husky", "cat", "dog"];

//Display the initial list of buttons
displayButtons();

//Add buttons each time users clicks on search
$("#submit").on("click", function(event){

	//Only Run if there's text entered
	if ($("#add-animal").val() !== ""){
		// Preventing the buttons default behavior when clicked (which is submitting a form)
	    event.preventDefault();

		topics.push($("#add-animal").val());

		displayButtons();
	}
});

//Function to display all buttons created within the button section
function displayButtons(){
	//First Empty the section before recreating it
	$("#button-section").empty();

	//Loop through the areay to recreate it
	for (var i = 0; i < topics.length; i++){

		//create button for each click
		var animalBtn = $("<button>");

		//Animal class added is to be used later for each of the animal button clicks
		animalBtn.addClass("btn btn-default animal");

		//Store the value of the text in a variable
		animalBtn.attr("data-attr",topics[i]);

		//Write the value of the search on the text button
		animalBtn.text(topics[i]);

		//Adding button to section
		$("#button-section").append(animalBtn);

		//Clear the search
		$("#add-animal").val("");
	}
}

// We're adding a click event listener to all elements with the class "animal"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $("#submit").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".animal", listimages);

$(document).on("click", ".gif", flipimages);

function listimages(){
	//Remove all variables from section
	$("#image-section").empty();

	//Reinitilize the query url
	queryURL = "https://api.giphy.com/v1/gifs/search?q=";

	var search = $(this).attr("data-attr");

	queryURL = queryURL + search + publicKey + limitResults;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		
		console.log(response);

		var results = response.data;

	    // Looping through each result item
	    for (var i = 0; i < results.length; i++) {

	    	// Creating and storing a div tag
	        var animalDiv = $("<div>");

	        animalDiv.addClass("image");

	        // Creating a paragraph tag with the result item's rating
	        var p = $("<p>").text("Rating: " + results[i].rating);

	        // Creating and storing an image tag
	        var animalImage = $("<img>");

	        // Setting the src attribute of the image to a property pulled off the result item
	        animalImage.attr("src", results[i].images.fixed_width_still.url);

	        //Setting all other images variables
	        animalImage.addClass("gif");
			animalImage.attr("data-still", results[i].images.fixed_width_still.url);
			animalImage.attr("data-animate", results[i].images.fixed_width.url);
			animalImage.attr("data-state", "still");

	        // Appending the paragraph and image tag to the animalDiv
	        animalDiv.append(p);
	        animalDiv.append(animalImage);

	        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
	        $("#image-section").prepend(animalDiv);
	      }
		
	});

}

 function flipimages() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}
var buttonarray = {
	animals: ["Dog","Cat","Bird","Elephant"],
	disney: ["Tangled","Ariel","Buzz Lightyear","Moana"],
	basketball: ["Michael Jordan","Kobe Bryant","Russell Westbrook","Vince Carter"],
	movies: ["The Matrix","Inception","Goodfellas","Forrest Gump"]
}
var runcounter = 0;
var currentresults = {};
var currentkey= "";

$(document).ready( function () {


	startbuttons(buttonarray);

});

$("#addAnimal").on("click", function () {

	var newvalue = $("#input").val();
	event.preventDefault();

	if (currentkey === "" ) {

		buttonarray[newvalue] = [];
		startbuttons(buttonarray);


	}
	else {

	
	buttonarray[currentkey].push(newvalue);
	console.log(buttonarray[currentkey]);
	buttongenerate(buttonarray[currentkey]);
	}

	$("#input").val("");

});

function startbuttons(startobject) {

	currentkey = "";

	$("#buttons").empty();

	for (var key in startobject) {

		var button = $('<button type="button" class="btn btn-primary genre-button"/>');

		 button.attr("value",key).text(key).css("margin","5px");

		 $("#buttons").append(button); 

	}


}

function buttongenerate(newarray) {

	
	$("#buttons").empty();

	for (var i = 0; i < newarray.length; i++) {
		 var button = $('<button type="button" class="btn btn-primary gif-button"/>');

		 button.attr("value",newarray[i]).text(newarray[i]).css("margin","5px");

		 $("#buttons").append(button); 
		 console.log("Button!")
	}
}

$("#buttons").on("click",".gif-button", function() {

	$("#gifs").empty();

	var selection = $(this).val();

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        selection + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
        url: queryURL,
        method: "GET"
      }).done( function(response) {



      	currentresults = response.data;

      	console.log(currentresults);

          // Looping over every result item
          for (var i = 0; i < currentresults.length; i++) {

            // Only taking action if the photo has an appropriate rating
           
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = currentresults[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<span>").text("Rating: " + rating);


              // Creating an image tag
              var personImage = $("<img class='gif' id='" + i + "'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", currentresults[i].images.fixed_height_still.url).css("display","block");
              personImage.attr("data-state","still");

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
             	gifDiv.append(personImage).append(p);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs").prepend(gifDiv);

              gifDiv.css("text-align","center");
              gifDiv.css("float","left").css("padding","10px");
            
      	}
     
});





});


$("#gifs").on("click",".gif", function() {

	if ($(this).attr("data-state") === 'still') {

		$(this).attr("src",currentresults[$(this).attr("id")].images.fixed_height.url);
		$(this).attr("data-state","animate");

}

else {

	$(this).attr("src",currentresults[$(this).attr("id")].images.fixed_height_still.url);
	$(this).attr("data-state","still");

}




});

$("#buttons").on("click",".genre-button", function () {

	currentkey = $(this).val();

	buttongenerate(buttonarray[currentkey]);


})

$("#reset").on("click",function() {


	startbuttons(buttonarray);
})



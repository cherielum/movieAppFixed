$(function () {
	//listen for when the form submits
	//when it submits, get the value of the search box
	//use $.get() to hit up the OMDb API
	//empty the previous results
	//for each result, generate, card HTML, injecting movie info into the card, 
	//add card to the screen
	function renderMovies (movies) {
		$('.card-columns').empty(); 

		movies.forEach(function(movie) {
			var newCardDiv = $('<div class= "card" style = "width: 20rem;"></div>');
			var imagePoster = $('<img class= "card-img-top"/>'); 
			var newBodyDiv = $('<div class = "card-body"></div>');
			var newCardTitle= $('<h4 class= "card-title"> Card title</h4>');
			var newCardBadgeYear = $('<span class = "badge badge-secondary float-right"></span>');
			var newAnchor = $('<a href= "#" data-movie="'+ movie.imdbID +' "class = "btn btn-primary addButton"> Add!</a>');


			if(movie.Poster == "N/A") {
				imagePoster.attr('src', "no_image.png");
			} else {
					imagePoster.attr('src', movie.Poster);
				}
			
			newCardTitle.text(movie.Title);
			newCardBadgeYear.text(movie.Year); 

			newCardTitle.append(newCardBadgeYear);
			newBodyDiv.append(newCardTitle, newAnchor);
			newCardDiv.append(imagePoster, newBodyDiv);

			$('.card-columns').append(newCardDiv);

		})
	}

		$('form').submit(function(e) {   //form is connected to <form>
		// button.on("click", function(e) {
        e.preventDefault();
		var search= $(".search-bar").val();
		var url = "http://www.omdbapi.com/?apikey=3430a78&s=" + search; 

		$.get(url, function(data) {
			renderMovies(data.Search);


		});
			
	});

	$('.card-columns').on('click', '.addButton', function(e) {
		var buttonJustClicked= $(this); 
		var movieID= buttonJustClicked.data("movie");   //from data-movie in newAnchor

		console.log(movieID); 

		var url ="http://www.omdbapi.com/?apikey=3430a78&i=" + movieID; 
		$.get(url, function(data) {
			var movieInstance= new Movie (data);
			console.log(movieInstance.movieData);
			movieInstance.addToWatchList();
		})

	});

		//somewhere we will have localStorage.setItem('watchlist', JSON.stringify(watchlist));
		//to get something we'll do JSON.parse(localStorage.getItem('watchlist')); 

		// var watchlist = [
		// {
		// 	Title: "Dark knight",
		// 	Poster:"img.jpg",
		// 	likeValue: 1
		// },
		// {
		// 	Title: "Dark Knight", 
		// 	Poster: "img.jpg"
		// }
		
	$('.watchlist').on('shown.bs.modal', function () {
		var currentWatchlist = localStorage.getItem('myWatchList');
		currentWatchlist = JSON.parse(currentWatchlist);
		if (!currentWatchlist) {
			currentWatchlist = {};
		}

		$('.modal-body').empty();

		Object.keys(currentWatchlist).forEach(function(imdbID){
			var currentMovieData = currentWatchlist[imdbID];
			var movieInstance = new Movie(currentMovieData);

			var movieHTML = movieInstance.generateHTML();

			$('.modal-body').append(movieHTML);
		});

	})

})

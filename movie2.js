//ES6

function Movie(movieData) {
	this.movieData=movieData; 
}

Movie.prototype.like= function() {

}

Movie.prototype.dislike = function() {

}

Movie.prototype.generateHTML = function() {
	var div = $('<div></div>');
	div.html(this.movieData.Title); 
	return div; 
}

Movie.prototype.addToWatchList = function () {
//add this movie instance to local storage



	var watchlist= localStorage.getItem('myWatchList');
	watchlist= JSON.parse(watchlist);

	//we need to check for nothingness- if someone didn't make a list in their catch yet

	if (!watchlist) {
		watchlist = {};
	}

	//let's add this movie to the watchlist 
	watchlist[this.movieData.imdbID]= this.movieData;   //imdbID is unique is what we can assume

	var stringifiedWatchList = JSON.stringify(watchlist);
	localStorage.setItem('myWatchList, watchlist');  

}

Movie.prototype.removieFromWatchList = function () {

}




// //ES5
// class Movie {

// 	constructor() {
// 		this.movieData = movieData;   //converting to ES6
// 	}

// 	like() {

// 	}

// 	dislike() {

// 	}

// 	generateHTML() {

// 	}

// 	addToWatchList() {

// 	}

// 	removieFromWatchList() {

// 	}

// }
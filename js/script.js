// esempio api
// https://api.themoviedb.org/3/movie/550?api_key=de1660ae74e359f522a07d42f19001a0

// mia chiave api
// de1660ae74e359f522a07d42f19001a0

$(document).ready(function() {
  $(".btn-search").click(function() {
    // svuoto risultati di ricerca
    $('#movie-list').html('');
    $('#tv-list').html('');
    // avvio funzione ricerca
    searchMovies();
  });
  $("#movie-search").keypress(function() {
    if (event.which == 13 || event.keyCode == 13) {
      $('#movie-list').html('');
      $('#tv-list').html('');
      searchMovies();
    }
  });
});


// FUNZIONI

// // stampa stelle
function starsRate(userRate) {
  var starsRate = Math.ceil(userRate / 2);
  var star = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= starsRate) {
      star += '<i class="fas fa-star"></i>';
    } else {
      star += '<i class="far fa-star"></i>';
    }
  }
  return star
}

// stampa bandiera
function flag(lang) {
  var flags = ['bg', 'de', 'el', 'en', 'es', 'fr', 'hi', 'it', 'ru', 'zh'];
  if (flags.includes(lang)) {
    return lang;
  } else {
    return lang = 'problem';
  }
}

// stampa poster
function printPoster(film) {

  var poster = '<img class="poster" src="img/notfound.jpg" alt=""/>';
  if (film != null) {
    poster = "<img class='poster' src='https://image.tmdb.org/t/p/w342" + film + "'>";
    return film = poster;
  } else {
    return film = poster
  }
}
// stampa overview
function printOverview(film) {
  if (film == "") {
    return film = 'non disponibile';

  } else {
    return film;
  }
}

// stampa film
function printMovies(movies) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < movies.length; i++) {
    var thisMovie = movies[i];
    var context = {
      title: thisMovie.title,
      original_title: thisMovie.original_title,
      original_language: flag(thisMovie.original_language),
      vote_average: starsRate(thisMovie.vote_average),
      width: 'w342',
      poster_path: printPoster(thisMovie.poster_path),
      overview: printOverview(thisMovie.overview)

    };
    var html = template(context);
    $('.movie-results-wrapper').append(html);

  }
};
// stampa serie tv
function printTvShows(tv) {
  var source = $("#tv-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < tv.length; i++) {
    var thisTvShow = tv[i];
    var context = {
      name: thisTvShow.name,
      original_name: thisTvShow.original_name,
      original_language: flag(thisTvShow.original_language),
      vote_average: starsRate(thisTvShow.vote_average),
      width: 'w342',
      poster_path: printPoster(thisTvShow.poster_path),
      overview: printOverview(thisTvShow.overview)
    };
    var html = template(context);
    $('.tv-results-wrapper').append(html);
  }
};
// ricerca film e serie tv
function searchMovies() {
  var userSearch = $('#movie-search').val();
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key: 'de1660ae74e359f522a07d42f19001a0',
      language: 'it-It',
      query: userSearch,
    },
    success: function(data) {
      $('h1.film').removeClass('hidden');
      var moviesFound = data.results;
      if (data.total_results > 0) {
        printMovies(moviesFound);


      } else {
        noResultsMovie();

      }

    },
    error: function(request, state, errors) {
      console.log(errors);
    }
  });
  $('#movie-search').val('');
  // tv shows
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: {
      api_key: 'de1660ae74e359f522a07d42f19001a0',
      language: 'it-It',
      query: userSearch,
    },
    success: function(data) {
      $('h1.tv').removeClass('hidden');
      var tvFound = data.results;
      if (data.total_results > 0) {
        printTvShows(tvFound);


      } else {
        noResultsTv();
      }

    },
    error: function(request, state, errors) {
      console.log(errors);
    }
  });
  $('#movie-search').val('');
};


// no risultati film
function noResultsMovie() {
  var source = $("#noresults-template").html();
  var template = Handlebars.compile(source);
  var html = template();
  $('#movie-list').append(html);
}
// no risultati serie tv
function noResultsTv() {
  var source = $("#noresults-template").html();
  var template = Handlebars.compile(source);
  var html = template();
  $('#tv-list').append(html);
}

// esempio api
// https://api.themoviedb.org/3/movie/550?api_key=de1660ae74e359f522a07d42f19001a0

// mia chiave api
// de1660ae74e359f522a07d42f19001a0

$(document).ready(function() {
  $(".btn-search").click(function() {
    // svuoto risultati di ricerca
    $('#movie-list').html('');
    // avvio funzione ricerca
    searchMovies()
  });
  $("#movie-search").keypress(function() {
    if (event.which == 13 || event.keyCode == 13) {
      $('#movie-list').html('');
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
// stampa film
function printMovies(movies) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < movies.length; i++) {
    var thisMovie = movies[i];
    // var starsRate = Math.ceil(thisMovie.vote_average / 2);
    var context = {
      title: thisMovie.title,
      original_title: thisMovie.original_title,
      original_language: flag(thisMovie.original_language),
      vote_average: starsRate(thisMovie.vote_average)
    };
    var html = template(context);
    $('#movie-list').append(html);
  }
};
// ricerca film
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
      var moviesFound = data.results;
      if (data.total_results > 0) {
        printMovies(moviesFound);


      } else {
        noResults();
      }

    },
    error: function(request, state, errors) {
      console.log(errors);
    }
  });
  $('#movie-search').val('');
};



// no risultati
function noResults() {
  var source = $("#noresults-template").html();
  var template = Handlebars.compile(source);
  var html = template();
  $('#movie-list').append(html);
}

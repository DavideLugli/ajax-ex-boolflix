// esempio api
// https://api.themoviedb.org/3/movie/550?api_key=de1660ae74e359f522a07d42f19001a0

// mia chiave api
// de1660ae74e359f522a07d42f19001a0

$(document).ready(function() {
  $(".btn-search").click(function() {
    // avvio funzione ricerca
    searchMovies()
  });
  $("#movie-search").keypress(function() {
    if (event.which == 13 || event.keyCode == 13) {
      searchMovies();
    }
  });
});
// FUNZIONI
function printMovies(movies) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < movies.length; i++) {
    var thisMovie = movies[i];
    var context = {
      title: thisMovie.title,
      original_title: thisMovie.original_title,
      original_language: thisMovie.original_language,
      vote_average: thisMovie.vote_average
    };
    var html = template(context);
    $('#movie-list').append(html);
  }

};

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
      printMovies(moviesFound);

    },
    error: function(request, state, errors) {
      console.log(errors);
    }
  });
  $('#movie-search').val('');
};

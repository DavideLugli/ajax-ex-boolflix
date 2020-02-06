$(document).ready(function() {
  // esempio api
  // https://api.themoviedb.org/3/movie/550?api_key=de1660ae74e359f522a07d42f19001a0

  // mia chiave api
  // de1660ae74e359f522a07d42f19001a0
  // var userSearch = $('#movie-search').val();
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key: 'de1660ae74e359f522a07d42f19001a0',
      language: 'it-It',
      query: 'Ritorno al Futuro',
    },
    success: function(data) {
      var moviesFound = data.results;
      printMovies(moviesFound);

    },
    error: function(request, state, errors) {
      console.log(errors);
    }
  })
});


// FUNZIONI
function printMovies(movies) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < movies.length; i++) {
    var thisMovie = movies[i];
    var context = {
      title: 'Titolo: ' + thisMovie.title,
      original_title: 'Titolo originale: ' + thisMovie.original_title,
      original_language: 'Lingua Originale: ' + thisMovie.original_language,
      vote_average: 'Voto Medio Utenti: ' + thisMovie.vote_average
    };
    var html = template(context);
    $('#movie-list').append(html);
  }

}

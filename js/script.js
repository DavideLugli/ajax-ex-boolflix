$(document).ready(function() {
  // esempio api
  // https://api.themoviedb.org/3/movie/550?api_key=de1660ae74e359f522a07d42f19001a0

  // mia chiave api
  // de1660ae74e359f522a07d42f19001a0
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key: 'de1660ae74e359f522a07d42f19001a0',
      language: 'it-It',
      query: 'Ritorno al futuro',
    },
    success: function(data) {
      console.log(data.results);
    },
    error: function(request, state, errors) {
      console.log(errors);
    }
  })
  // handlebars
  // var source = document.getElementById("entry-template").innerHTML;
  // var template = Handlebars.compile(source);
  // var context = { title: "My New Post", body: "This is my first post!" };
  // var html = template(context);
})

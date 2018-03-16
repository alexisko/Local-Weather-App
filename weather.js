$(document).ready(function() {
  $(window).load(function() {
    init();
  });

  function init() {
    var url = 'https://ipinfo.io/json/';
    $.getJSON(url, function(location) {
      console.log(location);
      var api = 'https://api.darksky.net/forecast';
      var key = '/f6fb2742ee4dea6f56907406ea3149ee/';

      // display location

      getWeather(api + key + location.loc);
    });
  }

  function getWeather(url) {
    // dark sky does not allow getJSON
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp',
      success: function(weather) {
        console.log(weather);

        // display weather
      }
    });
  }
});
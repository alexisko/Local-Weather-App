$(document).ready(function() {
  $(window).load(function() {
    init();
  });

  $('#celcius').on('click', function() {
    $('#celcius').prop('disabled', true);
    $('#fahrenheit').prop('disabled', false);
    $('.weather--scale').html('&#176;C');

    // convert to celcius
    var toCelcius = (parseInt($('.weather--temp').html()) - 32) / 1.8;
    $('.weather--temp').html(Math.round(toCelcius));
  });

  $('#fahrenheit').on('click', function() {
    $('#celcius').prop('disabled', false);
    $('#fahrenheit').prop('disabled', true);
    $('.weather--scale').html('&#176;F');

    // convert to fahrenheit
    var toFahrenheit = parseInt($('.weather--temp').html()) * 1.8 + 32;
    $('.weather--temp').html(Math.round(toFahrenheit));
  });

  function init() {
    var url = 'https://ipinfo.io/json/';
    $.getJSON(url, function(location) {
      console.log(location);
      var api = 'https://api.darksky.net/forecast';
      var key = '/f6fb2742ee4dea6f56907406ea3149ee/';

      // display location
      var city = location.city;

      $('.info--location').html(city);

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
        var currentTemp = parseInt(weather.currently.apparentTemperature);
        var forecast = weather.currently.summary;
        var icon = weather.currently.icon;

        $('.weather--temp').html(currentTemp);
        $('.info--forecast').html(forecast);
        $('.icon').addClass('wi wi-forecast-io-' + icon);
      }
    });
  }
});
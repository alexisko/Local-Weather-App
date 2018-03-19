var fahrenheitOn = true;

$(document).ready(function() {

  $('.container').hide();

  $(window).load(function() {
    init();
  });

  // convert to celcius
  $('#celcius').on('click', function() {
    $('#celcius').prop('disabled', true);
    $('#fahrenheit').prop('disabled', false);
    $('.weather--scale').html('&#176;C');

    fahrenheitOn = false;
    convertForecast();
    var celcius = convertToCelcius($('.weather--temp').html());
    $('.weather--temp').html(celcius);
  });

  // convert to fahrenheit
  $('#fahrenheit').on('click', function() {
    $('#celcius').prop('disabled', false);
    $('#fahrenheit').prop('disabled', true);
    $('.weather--scale').html('&#176;F');

    fahrenheitOn = true;
    convertForecast();
    var fahrenheit = concertToFahrenheit($('.weather--temp').html());
    $('.weather--temp').html(fahrenheit);
  });

  function init() {
    var url = 'https://ipinfo.io/json/';
    $.getJSON(url, function(location) {
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
        // display weather
        var currentTemp = parseInt(weather.currently.apparentTemperature);
        var summary = weather.currently.summary;
        var icon = weather.currently.icon;

        $('.weather--temp').html(currentTemp);
        $('.info--summary').html(summary);
        $('.icon').addClass('wi wi-forecast-io-' + icon);

        getForecast(weather.daily.data);
      }
    });
  }

  function getForecast(daily) {
    console.log(daily);
    var date = new Date();
    var day = date.getDay();
    for(var i = 0; i < 3; i++) {
      var weekday = getDay(day),
      icon = daily[i].icon,
      low = Math.round(daily[i].temperatureLow),
      high = Math.round(daily[i].temperatureHigh);
      day++;

      displayForecast(weekday, icon, low, high, i);
    }

    $('.loading').hide();
    $('.container').show();
  }

  function convertForecast() {
    for(var i = 0; i < 3; i++) {
      var low = $('.low-' + i).html(),
      high = $('.high-' + i).html();
      if(fahrenheitOn) {
        $('.low-' + i).html(concertToFahrenheit(low));
        $('.high-' + i).html(concertToFahrenheit(high));
      } else {
        $('.low-' + i).html(convertToCelcius(low));
        $('.high-' + i).html(convertToCelcius(high));
      }
    }
  }

  function displayForecast(weekday, icon, low, high, num) {
    var item = '<span class="forecast__item--day">' + weekday + '</span>';
    item += '<span class="forecast__item--icon wi wi-forecast-io-' + icon + '"></span>';
    var lowHigh = '<div class="forecast__item--low-high">';
    lowHigh += '<span class="low-' + num + '">' + low + '</span>';
    lowHigh += '<span> | </span>';
    lowHigh += '<span class="high-' + num + '">' + high + '</span>';
    lowHigh += '</div>';
    $('.forecast').append('<div class="forecast__item">' + item + lowHigh + '</div>');
  }

  function getDay(day) {
    var dayAbbrev = ['SUN','MON','TUES','WED','THURS','FRI','SAT'];
    return day>6 ? dayAbbrev[day-7] : dayAbbrev[day];
  }

  function convertToCelcius(temp) {
    return Math.round((parseInt(temp) - 32) / 1.8);
  }

  function concertToFahrenheit(temp) {
    return Math.round(parseInt(temp) * 1.8 + 32);
  }
});
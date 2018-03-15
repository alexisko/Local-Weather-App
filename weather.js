var curTemp, tempHigh, tempLow;
var celciusOn = true;
var dataFound = false;

$(document).ready(function() {
  $("#celcius").prop('disabled', true);
  $(".info-msg").html("Loading...");
  getLocation();

  $("#celcius").on('click', function() {
    convertTemp();
  });

  $("#farenheit").on('click', function() {
    convertTemp();
  });
});

function convertTemp() {
  if(!celciusOn && dataFound) {
    celciusOn = true;

    curTemp = parseInt((curTemp - 32) / 1.8);
    tempHigh = parseInt((tempHigh - 32) / 1.8);
    tempLow = parseInt((tempLow - 32) / 1.8);

    $(".temp").html(curTemp + "&#176; C");
    $(".temp-high").html("&#8595;" + tempHigh);
    $(".temp-low").html("&#8593;" + tempLow);

    $("#celcius").prop('disabled', true);
    $("#farenheit").prop('disabled', false);
  } else if(celciusOn && dataFound) {
    celciusOn = false;

    curTemp = parseInt(curTemp * 1.8 + 32);
    tempHigh = parseInt(tempHigh * 1.8 + 32);
    tempLow = parseInt(tempLow * 1.8 + 32);

    $(".temp").html(curTemp + "&#176; F");
    $(".temp-high").html("&#8595;" + tempHigh);
    $(".temp-low").html("&#8593;" + tempLow);

    $("#celcius").prop('disabled', false);
    $("#farenheit").prop('disabled', true);
  }
}

// function getCurTime() {
//   var date = new Date();
//   var hours, minutes, amPM;
//   hours = date.getHours();
//   minutes = date.getMinutes();
//   if(hours < 12) {
//     amPM = " AM";
//   } else {
//     amPM = " PM";
//   }

//   if(hours === 0) {
//     hours = "12";
//   } else if(hours > 12) {
//     hours = (hours - 12);
//   } else if (hours < 10) {
//     hours = "0" + hours;
//   }

//   if(minutes < 10) { minutes = "0" + minutes; }

//   $(".current-time").html(hours + ":" + minutes + amPM);
// }

// function getDate() {
//   var date = new Date();
//   var months = ['January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'];

//   $(".current-date").html(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
// }

function getLocation() {
  var latitude, longitude, cityState;
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var geocoder = new google.maps.Geocoder();

    var latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
            for(var i = 0; i < results[0].address_components.length; i++) {
              if(results[0].address_components[i].types[0] === 'locality') { //city
                cityState = results[0].address_components[i].long_name;
              } else if(results[0].address_components[i].types[0] === 'administrative_area_level_1') { //state
                cityState += ", " + results[0].address_components[i].short_name;
                $(".city-state").html(cityState);
              } else if(results[0].address_components[i].types[0] === 'neighborhood') {
                $(".neighborhood").html(results[0].address_components[i].short_name);
              }
            }
            setInterval(getCurTime, 1000);
            getDate();
        }
      }
    });

    //get weather
    var api = 'c768d4a88b0b5de357d4f616162c72ab';
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${parseInt(latitude)}&lon=${parseInt(longitude)}&APPID=${api}&units=metric`;
    $.getJSON(url, function(json) {
      dataFound = true;
      curTemp = parseInt(json.main.temp);
      tempHigh = parseInt(json.main.temp_min);
      tempLow = parseInt(json.main.temp_max);

      $(".info-msg").html("");
      $(".temp").html(curTemp + "&#176; C" );
      $(".temp-low").html("&#8593;" + tempLow);
      $(".temp-high").html("&#8595;" + tempHigh);
      getWeatherIcon(json.weather[0].id);
    });
  }

  function error() {
    $(".info-msg").html('Your cities weather data could not be found :(');
  }

}

function getWeatherIcon(weatherCode) {
  if(weatherCode < 300) { //Thunderstorm
    $(".forecast").html('<i class="fa fa-bolt"></i>');
  } else if(weatherCode < 600) { //Rain
    $(".forecast").html('<i class="fa fa-tint"></i>');
  } else if(weatherCode < 700) { //Snow
    $(".forecast").html('<i class="fa fa-snowflake-o"></i>');
  } else if(weatherCode === 800) { //Clear Sky
    $(".forecast").html('<i class="fa fa-sun-o"></i>');
  } else if(weatherCode < 900) { //Clouds
    $(".forecast").html('<i class="fa fa-cloud"></i>');
  }
}
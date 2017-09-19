var URL = '';

navigator.geolocation.getCurrentPosition(CreateURLRequest);

function CreateURLRequest(location) {
    var APPID = 'APPID=b6f815a1cdc5541fe552465bdecb3bde',
        API = 'http://api.openweathermap.org/data/2.5/weather?',
        LAN = '&lat=',
        LON = '&lon=',
        position = [];
    position = [location.coords.latitude, location.coords.longitude];
    URL = API + APPID + LAN + position[0] + LON + position[1];
}


$(document).ready(function () {
    $('button').click(function () {
        if (URL == '') {
            $('.main').html('<h3>We couldn\'t show anything cause you didn\'t allow get your geolocation</h3>');
        } else {
            $('button').css('display', 'none');
            sendWeatherRequest(URL);
        }
    });
});

function sendWeatherRequest(URL) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', URL, true);
    xhr.onload = function () {
        showWeatherInfo(this.responseText);
    }
    xhr.onerror = function () {
        $('#city').html('Ошибка ' + this.status);
        $('.lead').remove();
    }
    xhr.send();
}



function showWeatherInfo(weatherData) {
    weatherData = jQuery.parseJSON(weatherData);
    var city = weatherData.name || 'Data doesn\'t catched',
        temperature = weatherData.main.temp || 'Data doesn\'t catched',
        icon = '<img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png" />';
    $(document).ready(function () {
        $('#city').html('Location: ' + city);
        $('.lead').html(icon);
        $('.temperature').html('Celsium: ' + Math.round(temperature - 273.15));
    });
}
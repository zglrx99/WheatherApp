function CreateURLRequest(location) {
    var APPID = 'APPID=b6f815a1cdc5541fe552465bdecb3bde',
        API = 'http://api.openweathermap.org/data/2.5/weather?',
        LAN = '&lat=',
        LON = '&lon=',
        location = [];




    return API + APPID + LAN + location[0] + LON + location[1];
};

function getCurrentLocation() {
    var location = [], options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        location = [pos.coords.latitude, pos.coords.longitude];
    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    

    return location;
}

function sendWeatherRequest() {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', CreateURLRequest(), true);
    xhr.onload = function () {
        alert(this.responseText);
    }
    xhr.onerror = function () {
        alert('Ошибка ' + this.status);
    }
    xhr.send();
};
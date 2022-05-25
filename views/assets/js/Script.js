'use strict'

var callBackGetSuccess = function (data) {
    console.log("cordonnee api", data)
    var element = document.getElementById("zone_meteo");
    var icon = document.getElementById("icon")
    var description = document.getElementById("description")

    element.innerHTML = "La temperature aujourd'hui est de " + (data.main.temp) + " °C";
    description.innerHTML = "Le ciel est "+(data.weather[0].description);
    icon.innerHTML = '<img src="\https://openweathermap.org/img/w/'+(data.weather[0].icon)+'.png" height="100px" width="100px">';
}
function buttonClickGET() {
    var queryLoc = document.getElementById("queryLoc").value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryLoc + "&appid=c1550e47032f753476993a9f6ba80934&units=metric&lang=fr"
    $.get(url, callBackGetSuccess).done(function () {
    })
        .fail(function () {
            alert("error");
        })
        .always(function () {
        });
}

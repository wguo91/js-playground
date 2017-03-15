"use strict";
/**
 * Grabbing weather data from a webserver
 */
window.onload = function() {
  var base_path = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/266205/";
  var cities = [
    "San_Francisco",
    "Miami",
    "New_Orleans",
    "Chicago",
    "New_York_City"
  ];
  function constructDOM(json) {
    // create li and h2 elements
    var li = document.createElement("li");
    var h2 = document.createElement("h2");
    var txt = document.createTextNode(json.name);
    h2.appendChild(txt);
    li.appendChild(h2);

    // create first p tag
    var div = document.createElement("div");
    var p1 = document.createElement("p");
    var temp = convertKtoF(Number.parseFloat(json.main.temp));
    p1.appendChild(document.createTextNode(temp + "°"));

    // create second p tag
    var p2 = document.createElement("p");
    var span1 = document.createElement("span");
    var img = document.createElement("img");
    img.src = getIconURL(json.weather[0].icon);
    span1.appendChild(img);
    var span2 = document.createElement("span");
    span2.appendChild(document.createTextNode(json.weather[0].main));
    p2.appendChild(span1);
    p2.appendChild(span2);
    p2.className = "flex";

    // create third p tag
    var p3 = document.createElement("p");
    p3.appendChild(document.createTextNode(json.wind.speed + " mph"));

    // append all p tags to div
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    // append div to li
    li.appendChild(div);
    // append li to ul
    document.getElementsByClassName("weather-cards")[0].appendChild(li);
  }
  var xhr = [];
  for(var i = 0; i < cities.length; i++) {
    (function(i) {
      xhr[i] = new XMLHttpRequest();
      var encodedURL = base_path + cities[i] + ".json";
      xhr[i].open("GET", encodedURL, true);
      xhr[i].addEventListener("readystatechange", function() {
        if(xhr[i].readyState === XMLHttpRequest.DONE && xhr[i].status === 200) {
          var json = JSON.parse(xhr[i].responseText);
          constructDOM(json);
        }
      }, false);
      xhr[i].send(null);
    })(i);
  }
  // convert mps to mph
  function fromMPStoMPH(mps) {
    return (Math.round(10 * mps * 2.2369362920544) / 10);
  }
  // convert kelvins to fahrenheit
  function convertKtoF(kelvin) {
    return Math.round((kelvin - 273.15) * 1.8);
  }
  // get the weather icon
  function getIconURL(icon) {
    return "http://openweathermap.org/img/w/" + icon + ".png";
  }
};

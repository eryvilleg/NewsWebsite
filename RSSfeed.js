backgroundColor();
function backgroundColor(){    
    var currentTime = new Date().getHours();
    if(7 <= currentTime && currentTime < 20){
        document.getElementById('clearsky').style.backgroundColor = "#87CEFA";
    }else{
       document.getElementById('clearsky').style.backgroundColor = "#000217";
    }
}

 var today = new Date();

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
var week = new Array(7);

dates();

function dates(){
    
    var day = today.getDate();
    var mo = today.getMonth();
    var year = today.getFullYear();
    
    week[0] = "Sunday";
    week[1] = "Monday";
    week[2] = "Tuesday";
    week[3] = "Wednesday";
    week[4] = "Thursday";
    week[5] = "Friday";
    week[6] = "Saturday";
    
    var dw = week[today.getDay()];
    
    
    document.getElementById('date').innerHTML = dw +" "+ mo + "/" + day + "/" + year;
}
 

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var time = " ";
    m = checkTime(m);
    s = checkTime(s);
    if(h > 11){
        time = "p.m."
    }if(h <11){
        time = "a.m."
    }
    
    if(h > 12){
       h = h - 12;
    }
    if(h == 0){
        h = 12;
    }
    
    
    
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s + " " + time;
    t = setTimeout(function () {
        startTime()
    }, 500);
}
startTime();

$(document).ready(function () {
    loadData();

    getArticles('http://www.npr.org/rss/rss.php?id=1001', '#bus');
    getArticles('http://www.npr.org/rss/rss.php?id=1006', '#top');
    getArticles('http://www.npr.org/rss/rss.php?id=1004', '#wor');
    getArticles('http://world.kbs.co.kr/rss/rss_enternews.htm?lang=e', '#kpo');

    setInterval(ticker, 5000);
});

var stockNum = 0;

var weatherData;
var request = new XMLHttpRequest();
var date = new Date();

function loadData() {
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Salt Lake City, US&units=imperial&APPID=5b58cb430029c691af5164121654fe53');
    request.onload = loadComplete;
    request.send();
}

function loadComplete(evt) {
    weatherData = JSON.parse(request.responseText);
    console.log(weatherData);
    document.getElementById("place").innerHTML = weatherData.name;
    document.getElementById("currentTemp").innerHTML = weatherData.main.temp + " ℉";
    document.getElementById("conditions").innerHTML = weatherData.weather[0].main + " (" + weatherData.weather[0].description + ")";

    if (weatherData.weather[0].main.includes("Sun")) {
        document.getElementById("weatherico").src = 'WeatherIcons/Sunny.png';
    } else if (weatherData.weather[0].main.includes("Rain")) {
        document.getElementById("weatherico").src = 'WeatherIcons/Rain.png';
    } else if (weatherData.weather[0].main.includes("Snow")) {
        document.getElementById("weatherico").src = 'WeatherIcons/Snow.png';
    } else if (weatherData.weather[0].main.includes("Cloud")) {
        document.getElementById("weatherico").src = 'WeatherIcons/Could.png';
    }
}

function ticker() {
    var stockNames = [
        'goog', 'msft', 'aapl', 'ssnlf', 'hmb', 'lnvgy', 'nflx', 'amgn', 'alk', 'kr'
    ];

    if (stockNum === 9) {
        stockNum = 0;
    } else {
        stockNum++;
    }

    getStocks(stockNames[stockNum]);
}

function getStocks(stockUrl) {
    $.ajax({
        url: "http://www.google.com/finance/info?q=" + stockUrl,
        dataType: "jsonp",
        success: function (data) {
            $.each(data, function (i, e) {
                var stockString = e.t +
                    "\nChange: " + e.c +
                    "\nCurrent: " + e.l_cur;

                if (stockString.includes("+")) {
                    $('#sto').html('<p style="color:green">' + stockString + '</p>');
                } else if (stockString.includes("-")) {
                    $('#sto').html('<p style="color:red">' + stockString + '</p>');
                } else {
                    $('#sto').html('<p>' + stockString + '</p>');
                }
            });
        }
    });
}

function getArticles(urltoarticles, articlesection) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urltoarticles),
        dataType: 'json',
        success: function (data) {
            if (data.responseData.feed && data.responseData.feed.entries) {
                $.each(data.responseData.feed.entries.slice(0, 3), function (i, e) {
                    $(function () {
                        $('<a href="' + e.link + '"><h3>' + e.title + '</h3></href>').appendTo(articlesection);
                        $('<p>' + e.content + '</p>').appendTo(articlesection);
                    });
                });
            }
        }
    });
}
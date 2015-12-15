$(document).ready(function () {
    getArticles('http://www.npr.org/rss/rss.php?id=1001', '#bus');
    getArticles('http://www.npr.org/rss/rss.php?id=1006', '#top');
    getArticles('http://www.npr.org/rss/rss.php?id=1004', '#wor');
    getArticles('http://world.kbs.co.kr/rss/rss_enternews.htm?lang=e', '#kpo');

    setInterval(ticker, 5000);
});

var stockNum = 0;

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

//pass in the urls seperately-
function getStocks(stockUrl) {
    $.ajax({
        url: "http://www.google.com/finance/info?q=" + stockUrl,
        dataType: "jsonp",
        success: function (data) {
            $.each(data, function (i, e) {
                var stockString = e.t +
                    "\nChange: " + e.c +
                    "\nCurrent: " + e.l_cur;

                $('#sto').html('<p>' + stockString + '</p>');
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
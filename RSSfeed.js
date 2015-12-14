$(document).ready(function () {
    getArticles('http://www.npr.org/rss/rss.php?id=1001', '#bus');
    getArticles('http://www.npr.org/rss/rss.php?id=1006', '#top');
    getArticles('http://www.npr.org/rss/rss.php?id=1004', '#wor');
    getArticles('http://world.kbs.co.kr/rss/rss_enternews.htm?lang=e', '#kpo');
});

function getArticles(urltoarticles, articlesection) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urltoarticles),
        dataType: 'json',
        success: function (data) {
            if (data.responseData.feed && data.responseData.feed.entries) {
                $.each(data.responseData.feed.entries.slice(0, 3), function (i, e) {
                    $(function () {
                        $('<h3>' + e.title + '</h3>').appendTo(articlesection);
                        $('<p>' + e.content + '</p>').appendTo(articlesection);
                    });
                });
            }
        }
    });
}
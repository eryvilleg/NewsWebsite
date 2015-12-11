

$.ajax({
  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://world.kbs.co.kr/rss/rss_enternews.htm?lang=e'),
  dataType : 'json',
  success  : function (data) {
    if (data.responseData.feed && data.responseData.feed.entries) {
         var container = $('<kpop />');
      $.each(data.responseData.feed.entries, function (i, e) {
          $(function () {  
    $('<p>' + e.title +'</p>').appendTo('#kpop');
     $('<p>'+e.content + '</p>').appendTo('#kpop');
});
        console.log("title      : " + e.title);
        console.log("content: " + e.content);
      });
    }
  }
});
var mainHeight = function() {
  var total    = $(window).height(),
      $section = $('.outlined').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(mainHeight);

$(function() {
  // $(".outlined h1, .outlined h2, .outlined h3").each(function(){
  //   $("nav > ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
  //   $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
  //   $("nav > ul li:first-child a").parent().addClass("active");
  // });

  $(".outlined h1").each(function(){
    // add this h1 to nav
    var contentH1 = $(this);
    contentH1.attr("id",contentH1.text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    var navList = $("nav > ul");
    var navH1 = $("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    navList.append(navH1);
    // find if h1 has children
    var contentH2List = contentH1.find("h1 > h2");
    if contentH2List.length > 0 {
      var h1List = $("<ul></ul>");
      navH1.append(h1List);
      contentH2List.each(function() {
        var contentH2 = $(this);
        contentH2.attr("id",contentH2.text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
        var navH2 = $("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
        h1List.append(navH2);
      });
    }
  });
  
  
  $("nav > ul li:first-child a").parent().addClass("active");
  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  mainHeight();

  $('img').on('load', mainHeight);
});

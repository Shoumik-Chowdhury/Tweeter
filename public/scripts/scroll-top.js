$(document).ready(function() {

  $(".compose").click(() => {
    
    $("html").animate({scrollTop: 0}, 500);
    $("#tweet-text").focus();

  });

  setInterval(() => {
    
    $(".fa-angle-double-down").animate({margin: 25}, 1000);
    $(".fa-angle-double-down").animate({margin: 0}, 1000);

  }, 2010);

});
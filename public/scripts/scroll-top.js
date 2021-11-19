$(document).ready(function() {

  $(".compose").click(() => { // On clicking "Write new tweet" scroll to top of page
    
    $("html").animate({scrollTop: 0}, 500);
    $("#tweet-text").focus(); // Auto focus on text area

  });

  setInterval(() => { // Looping animation of double angle arrow in nav bar
    
    $(".fa-angle-double-down").animate({margin: 25}, 1000);
    $(".fa-angle-double-down").animate({margin: 0}, 1000);

  }, 2010);

});
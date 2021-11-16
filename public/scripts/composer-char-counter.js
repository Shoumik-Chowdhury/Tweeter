$(document).ready(function() {
  
  const $tweetbox = $("#tweet-text");
  $tweetbox.on("input", function(event) {
    
    let char = $(this).val().length;
    let charRemain = 140 - char;
    $(this).parent().children("div").children(".counter").val(charRemain);
    
    if (charRemain < 0) {
      $(this).parent().children("div").children(".counter").addClass('negetive');
    }
    if (charRemain >= 0) {
      $(this).parent().children("div").children(".counter").removeClass('negetive');
    }

  })

});
// Client side JS

$(document).ready(function() {

  renderTweets = (data) => { // Renders all tweets and adds them to index.html
    
    for (let val of data) {
      let $tweet = createTweetElement(val);
      $('.tweet-container').prepend($tweet);
    }
    
  };
  
  createTweetElement = (data) => { // Creates single tweet article from data object
    
    const $tweet = $('<article></article>');
    
    const $header = $(`<header><div id="name"><img src=${data.user["avatars"]}>${data.user["name"]}</div>
    <div id="handle">${data.user["handle"]}</div></header>`);
    
    const $body = $(`<div class="tweet-body">${escape(data.content["text"])}</div>`);
    
    const $footer = $(`<footer><div id="time">${timeago.format(data.created_at)}</div>
    <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>`);
    
    $tweet.append($header).append($body).append($footer);

    return $tweet;
  };
  
  const escape = function(str) { // Used to escape XSS
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  $("form").submit(function(event) { // Functions to execute on form submit
    
    event.preventDefault();
    
    let $formData = $(this).serialize(); // Serialize form data as query string

    if (!$('#tweet-text').val()) { // Detect empty tweet submission, show error msg
      let errMsg  = '<div id="empty-tweet">Cannot post empty tweet! That\'s illegal! <i class="fas fa-exclamation-triangle"></i></div>';
      $(".error-text").html(errMsg).hide().slideDown();
      return;
    }

    if ($('.counter').val() < 0) { // Detect character limit violation, show error msg
      let errMsg = '<div id="long-tweet">Cannot post more than 140 characters! <i class="fas fa-exclamation-triangle"></i></div>';
      $(".error-text").html(errMsg).hide().slideDown();
      return;
    }
    
    $(".error-text").empty(); // Hide error text if already shown and no error detected

    $.post("/tweets/", $formData); // Send AJAX post request with form input serialized
    
    setTimeout(()=>{ // Send AJAX get request after a short delay to prevent sync issues
      $.get("/tweets", (res) => {
        let lastTweet = res[res.length - 1];
        renderTweets([lastTweet]); // render the latest tweet
      });
    }, 300);

    $("#tweet-text").val(""); // Empty form text input area after submission
    $("#tweet-text").focus(); // Focus automatically on text area after submission to allow continue typing

  });
  
  loadTweets = function() { // Load previously saved tweets in database
    
    $.get("/tweets", (res) => {
      renderTweets(res);
    });
    
  };
  
  loadTweets();
  
});

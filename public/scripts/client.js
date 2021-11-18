/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  renderTweets = (data) => {
    
    for(let val of data) {
      let $tweet = createTweetElement(val);
      $('.tweet-container').append($tweet);
    }
    
  }
  
  createTweetElement = (data) => {
    
    const $tweet = $('<article></article>');
    
    const $header = $(`<header><div id="name"><img src=${data.user["avatars"]}>${data.user["name"]}</div>
    <div id="handle">${data.user["handle"]}</div></header>`);
    
    const $body = $(`<div class="tweet-body">${data.content["text"]}</div>`);
    
    const $footer = $(`<footer><div id="time">${timeago.format(data.created_at)}</div>
    <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>`);
    
    $tweet.append($header).append($body).append($footer);
    
    return $tweet;
  }
  
  $("form").submit(function(event) {
    
    event.preventDefault();
    
    let $formData = $(this).serialize();

    if (!$('#tweet-text').val()) return alert('Cannot post empty tweet!!!');
    if ($('.counter').val() < 0) return alert('Tweet too long!!!');

    $.post("/tweets/", $formData);
    
  });
  
  loadTweets = function() {
    
    $.get("/tweets", (res) => {
      renderTweets(res);
    });
    
  };
  
  loadTweets();
  
});

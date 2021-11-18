/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  renderTweets = (data) => {
    
    for(let val of data) {
      let $tweet = createTweetElement(val);
      $('.tweet-container').prepend($tweet);
    }
    
  }
  
  createTweetElement = (data) => {
    
    const $tweet = $('<article></article>');
    
    const $header = $(`<header><div id="name"><img src=${data.user["avatars"]}>${data.user["name"]}</div>
    <div id="handle">${data.user["handle"]}</div></header>`);
    
    const $body = $(`<div class="tweet-body">${escape(data.content["text"])}</div>`);
    
    const $footer = $(`<footer><div id="time">${timeago.format(data.created_at)}</div>
    <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>`);
    
    $tweet.append($header).append($body).append($footer);

    return $tweet;
  }
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  $("form").submit(function(event) {
    
    event.preventDefault();
    
    let $formData = $(this).serialize();

    if (!$('#tweet-text').val()) {
      let errMsg  = '<div id="empty-tweet">Cannot post empty tweet! That\'s illegal! <i class="fas fa-exclamation-triangle"></i></div>';
      $(".error-text").html(errMsg).hide().slideDown();
      return;
    };
    
    if ($('.counter').val() < 0) {
      let errMsg = '<div id="long-tweet">Cannot post more than 140 characters! <i class="fas fa-exclamation-triangle"></i></div>';
      $(".error-text").html(errMsg).hide().slideDown();
      return;
    };
    
    $(".error-text").empty();

    $.post("/tweets/", $formData);
    
    setTimeout(()=>{
      $.get("/tweets", (res) => {
        let lastTweet = res[res.length - 1];
        renderTweets([lastTweet]);
      })
    }, 300);

  });
  
  loadTweets = function() {
    
    $.get("/tweets", (res) => {
      renderTweets(res);
    });
    
  };
  
  loadTweets();
  
});

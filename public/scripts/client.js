/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  createTweetElement = (data) => {
    const $tweet = $('<article></article>');

    const $header = $(`<header><div id="name"><img src=${data.user["avatars"]}>${data.user["name"]}</div>
                          <div id="handle">${data.user["handle"]}</div></header>`);

    const $body = $(`<div class="tweet-body">${data.content["text"]}</div>`);

    const $footer = $(`<footer><div id="time">${timeago.format(data.created_at)}</div>
                          <div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>`);
    
    return $tweet.append($header).append($body).append($footer);
  }

  const $tweet = createTweetElement(tweetData);

  $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
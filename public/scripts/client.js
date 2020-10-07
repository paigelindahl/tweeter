/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function () {
  $("#tweet-form").on('submit', submitHandler)
  
  renderTweets(data);
 });

 const submitHandler = function (event) {
  event.preventDefault();
  const $form = $(this);
  const data = $form.serialize();
  
  $.ajax({
    method: "POST", 
    url: "/tweets/", 
    data
  }).then(function() {
      console.log('complete');
  })
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = function (tweet) {
  const dateObj = new Date(tweet.created_at * 1000);
  const utcString = dateObj.toUTCString();
  const date = utcString.slice(0, 11);
  const $tweet = $(`<article class="tweets-parent">
  <header class="tweet-header">
    <div>
      <img src="${tweet.user.avatars}"/>
      <p class="name">${tweet.user.name}</p>
    </div>
    <p class="handle">${tweet.user.handle}</p>
  </header>
    <p class="tweets">${tweet.content.text}</p>
  <footer class="footer">
    <p class="footer-tweet">${date}</p>
    <div>
      <span>&#9873</span>
      <span>&#8633</span>
      <span>&#10084</span>
    </div>
  </footer>
</article>`);
return $tweet;
 };

 const renderTweets = function(tweets) {
  const $container = $('.tweets-container');
  for (let tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $container.prepend($tweetElement);
  }
 };


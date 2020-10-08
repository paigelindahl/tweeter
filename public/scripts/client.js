/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  $('#tweet-form').on('submit', submitHandler);
  const loadtweets = function() {
   $.ajax('/tweets/', {method: 'GET'})
   .then(function (res, err) {
     renderTweets(res)
   });
  }
  loadtweets();
})

 const submitHandler = function (event) {
  event.preventDefault();
  const $form = $(this);
  console.log('this is the form', $form);
  const charLength = $('#tweet-text').val().length;
  const data = $form.serialize();
    if (charLength >= 140 || charLength === 0) {
    // alert('Your tweet is too long!');
    $(".error").slideDown();
    $(".error").css('visibility', 'visible'); 
  } else {
  $.ajax({
    method: "POST", 
    url: "/tweets/", 
    data
  }).then(function() {
    $(".error").slideUp();
      document.getElementById("tweet-form").reset();
      $.ajax('/tweets/', {method: 'GET'})
        .then(function (res, err) {
          renderTweets([res[res.length-1]]);
        });
  });
  }
};
/* <script>alert('uhoh');</script> */

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
  <p class="tweets">${escape(tweet.content.text)}</p>
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


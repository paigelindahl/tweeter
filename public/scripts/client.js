$(document).ready(function() {
  $('#tweet-form').on('submit', submitHandler);
  const loadtweets = function() {
    $.ajax('/tweets/', {method: 'GET'})
      .then(function(res, err) {
        renderTweets(res);
      });
  };
  loadtweets();
});

// if characters are over limit or an empty textarea is passed it will 
// return an error otherwise will load tweets and clear counter
const submitHandler = function(event) {
  event.preventDefault();
  const $form = $(this);
  console.log('this is the form', $form);
  const charLength = $('#tweet-text').val().length;
  const data = $form.serialize();
  const section = $form.closest('section');
  const errorMsg = section.find('.error');
  if (charLength > 140 || charLength === 0) {
    errorMsg.addClass('errorVisible');
    $(".error").slideDown();
  } else {
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data
    }).then(function() {
      $(".error").slideUp();
      errorMsg.removeClass('errorVisible');
      document.getElementById("tweet-form").reset();
      $.ajax('/tweets/', {method: 'GET'})
        .then(function(res, err) {
          renderTweets([res[res.length - 1]]);
          $('.counter').html(140);
        });
    });
  }
};

// counters against malicious text input
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
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


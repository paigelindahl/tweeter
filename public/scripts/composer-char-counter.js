$(document).ready(function() {
  $('#tweet-text').keyup(function(evt){
    const $input = $(this);
    const form = $input.closest('form');
    const counter = form.find('.counter');
    const counterInput = (140 - $input.val().length);
    counter.html(counterInput);
    if (counterInput < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});
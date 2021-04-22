// console.log("This is the char counter file!!");

$(document).ready(() => {
  // code..
  console.log("DOM is now ready to be manipulated with jQuery");

  let charCount = 0;
  $("#tweet-text").on('input',function () {
    const maxTweet = 140;
    charCount = $(this).val().trim().length;
    let counter = $(this).siblings('div').children('output');
    let diff = maxTweet - charCount;
    if (diff < 0) {
      counter.text(diff).addClass('overCount');
    }
    if (diff >= 0) {
      counter.text(diff).removeClass('overCount');
    }
  });

});

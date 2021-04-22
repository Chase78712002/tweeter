/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const renderTweets = (tweetsArray) => {
    // loops through tweetsArray
    for (const tweetObj of tweetsArray) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweetObj);
      // takes return value and appends it to the tweets container
      $(".tweet-container").append($tweet);
    }
  };

  const createTweetElement = (tweetDataObj) => {
    // return a tweet <article> element <-- containing the structure of the whole tweet
    const $tweetElement = $(`
    <article class="tweet">
          <header>
            <div class="profile-pic">
              <img src=${tweetDataObj.user.avatars} />
              ${tweetDataObj.user.name}
            </div>
            <div>${tweetDataObj.user.handle}</div>
          </header>
          <p>
            ${tweetDataObj.content.text}
          </p>
          <footer>
            <div class="need_to_be_rendered" datetime=${JSON.stringify(tweetDataObj.created_at)}>
            </div>
            <div>
              <i class="fab fa-canadian-maple-leaf"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
    `);
    return $tweetElement;
  };

  const loadTweets = () => {
    // responsible for fetching tweets.
    $.ajax("/tweets", {
      method: "GET"
    })
    .then((result)=> {
      // result is an array of objects
      renderTweets(result);
      timeago.render(document.querySelectorAll(".need_to_be_rendered"));
    })
  };


  $.ajax("http://localhost:8080/", { method: "GET" }).then((result) => {
    loadTweets();
  });

  $("form").submit(function (event) {
    event.preventDefault();
    console.log("Hi! I've prevented the default behavior!")
    const remainChar = $(this).children('div').children('output').val();
    const inputBox = $('#tweet-text').val();
    if (remainChar < 0) {
      alert('Max character counts exceeded!!');
      return;
    }
    
    if (!inputBox || inputBox.trim().length === 0) {
      alert('Please enter at least one character in the text field!');
      return;
    }
    const queryString = $(this).serialize()

    $.ajax("/tweets", {
      method: "POST",
      data: queryString
    })
    .then((result)=> {
      loadTweets();
    })
  })

});

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
      $(".tweet-container").append($tweet);
      // takes return value and appends it to the tweets container
    }
  };

  const createTweetElement = (tweetDataObj) => {
    // return a tweet <article> element <-- containing the structure of the whole tweet
    const $tweetElement = $(`
    <article class="tweet">
          <header>
            <div class="profile-pic">
              <img src=${escape(tweetDataObj.user.avatars)} />
              ${escape(tweetDataObj.user.name)}
            </div>
            <div>${escape(tweetDataObj.user.handle)}</div>
          </header>
          <p>
            ${escape(tweetDataObj.content.text)}
          </p>
          <footer>
            <div class="need_to_be_rendered" datetime=${escape(tweetDataObj.created_at)}>
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
      result.sort((a,b) => b.created_at - a.created_at);
      // result is an array of objects
      renderTweets(result);
      timeago.render(document.querySelectorAll(".need_to_be_rendered"));
    })
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
  $(".error-msg").hide();

  $.ajax("http://localhost:8080/", { method: "GET" }).then((result) => {
  });

  $("form").submit(function (event) {
    event.preventDefault();
    console.log("Hi! I've prevented the default behavior!")
    const remainChar = $(this).children('div').children('output').val();
    const inputBox = $('#tweet-text').val();
    // console.log(inputBox);
    if (remainChar < 0) {
      $("#space-error").slideUp(700);
      $("#max-char").slideDown(700);
      return;
    }
    
    if (!inputBox || inputBox.trim().length === 0) {
      $("#max-char").slideUp(700);
      $("#space-error").slideDown(700);
      return;
    }

    $("#space-error").slideUp(700);
    $("#max-char").slideUp(700);

    const queryString = $(this).serialize()

    $.ajax("/tweets", {
      method: "POST",
      data: queryString
    })
    .then((result)=> {
      const $tweet = createTweetElement(result);
      $(".tweet-container").prepend($tweet);
      $("#tweet-text").val("");
      $(".counter").val(140);
      timeago.render(document.querySelectorAll(".need_to_be_rendered"));
    })
  })

  // Compose button
  $("#navTweet").click(function(){
    $(".tweetForm").slideToggle(700, function() {
      $(this).children('textarea').focus();
    });
  })

  $(window).scroll(function() {
    $("button#toTop").fadeIn();
    if($(this).scrollTop() === 0) {
      $("button#toTop").fadeOut();
    }
    $("button#toTop").click(()=> {
      $(window).scrollTop(0);
    })
  })

});

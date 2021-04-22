/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  

  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  

  $.ajax("http://localhost:8080/", { method: "GET" }).then((result) => {
    renderTweets(data);
    timeago.render(document.querySelectorAll(".need_to_be_rendered"));
  });

  $("form").submit(function (event) {
    event.preventDefault();
    console.log("Hi! I've prevented the default behavior!")
    const queryString = $(this).serialize()
    console.log(queryString);

    $.ajax("http://localhost:8080/tweets", {
      method: "POST",
      data: queryString
    })
  })
});

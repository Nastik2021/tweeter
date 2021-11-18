/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

  //renderTweets(data);

  $("#submit_tweets").on('submit', function (event) {
    event.preventDefault(); //this prevents the default behavior, which is to reload the page
    const $tweetText = $(this).serialize();
    $.post('/tweets/', $tweetText).then(data => {
      console.log(data);
      loadTweets();
    });
  });

  //This will load tweets from the /tweets
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" }).then((data) => {
      renderTweets(data);
    });
  };
  loadTweets();


//this is our fake data taken from the JSON file
// const data = [{
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];





  //Function that renders created tweets using the function createTweetElement
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };


  //This function takes in an object element from JSON and created the tweet
  const createTweetElement = (obj) => {
  const createdAtTime = timeago.format(obj.created_at); ////WHY does it say not defined???
  const $tweet = $(`
    <article class="tweets">
            <header>
              <span class="username"><i class="fas fa-smile"></i>${obj.user.name}</span>
              <span class="userid">${obj.user.handle}</span>
            </header>
            
            <p>${obj.content.text}</p>

            <footer>
              <span>${createdAtTime}</span>
              <span><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
            </footer>
      </article>
    `);

    return $tweet;
  };

});
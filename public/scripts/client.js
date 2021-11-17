/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(e) {
 
  //this is our fake data taken from the JSON file
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
  ];


  //Function that renders created tweets using the function createTweetElement
  const renderTweets = function(tweets) {
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


// const $tweet = createTweetElement(tweetData);
// console.log("This is out tweet:", $tweet); // to see what it looks like
// // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


  renderTweets(data);
});


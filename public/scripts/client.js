/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  //Function that renders created tweets using the function createTweetElement
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-text').val('');
      $('#tweets-container').prepend($tweet);
    }
  };


  //This function takes in an object element from JSON and created the tweet
  const createTweetElement = (obj) => {
  const createdAtTime = timeago.format(obj.created_at); ////WHY does it say not defined???
  
  //function for cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweet = $(`
    <article class="tweets">
            <header>
              <span class="username"><i class="fas fa-smile"></i>${obj.user.name}</span>
              <span class="userid">${obj.user.handle}</span>
            </header>
            
            
            <p>${escape(obj.content.text)}</p>

            <footer>
              <span>${createdAtTime}</span>
              <span><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
            </footer>
      </article>
    `);

    return $tweet;
  };



   //This will load tweets from the /tweets
   const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" }).then((data) => {
      renderTweets(data);
    });
  };

  //renderTweets(data);

  $("#submit_tweets").on('submit', function (event) {
    event.preventDefault(); //this prevents the default behavior, which is to reload the page
    const $tweetText = $(this).serialize();
    
    
    if ($tweetText.length - 5 === 0) {
      alert("Your tweet cannot be empty");
      return;
    } else if ($tweetText.length > 140) {
      alert("Your tweet exceeds the maximum length allowed");
      return;
    }
    
    $.post('/tweets', $tweetText).then(data => {
      console.log(data);
      $('#tweets-container').empty();
      loadTweets();
    });
  });

 
  loadTweets();

});


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





  


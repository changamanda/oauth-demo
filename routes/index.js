var express = require('express');
var router = express.Router();

var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  // STEP 1
  var key = process.env.TWITTER_CONSUMER_KEY
  var secret = process.env.TWITTER_CONSUMER_SECRET

  var token = `${key}:${secret}`;
  var encoded = new Buffer(token).toString('base64');

  // STEP 2
  var tokenOptions = {
    url: 'https://api.twitter.com/oauth2/token',
    headers: {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    method: 'POST',
    body: "grant_type=client_credentials"
  };

  request(tokenOptions, function(error, tokenResponse, tokenBody) {
    if (!error && tokenResponse.statusCode == 200) {
      // STEP 3
      var token = JSON.parse(tokenBody).access_token
      var statusesOptions = {
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=changamanda&count=2',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      request(statusesOptions, function(error, response, twitterBody){
        // RETURN JSON
        res.json(twitterBody);
      })
    }
  });
});

module.exports = router;

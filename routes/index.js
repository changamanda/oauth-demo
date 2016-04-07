var express = require('express');
var router = express.Router();

var request = require('request');
var CryptoJS = require("crypto-js");

/* GET home page. */
router.get('/', function(req, res) {
  var key = process.env.TWITTER_CONSUMER_KEY;
  var nonce = "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg";
  var method = "HMAC-SHA1";
  var seconds = parseInt(new Date()/1000);
  var access_token = process.env.TWITTER_ACCESS_TOKEN;
  var version = "1.0";

  var params = `oauth_consumer_key=${escape(key)}&oauth_nonce=${escape(nonce)}&oauth_signature_method=${method}&oauth_timestamp=${seconds}&oauth_token=${escape(access_token)}&oauth_version=${version}`;

  var base = `POST&${escape('https://api.twitter.com/oauth/request_token')}&${params}`;
  var signingKey = `${escape(process.env.TWITTER_CONSUMER_SECRET)}&${escape(process.env.TWITTER_ACCESS_TOKEN_SECRET)}`;

  var signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base, signingKey));

  var headerString = `OAuth oauth_consumer_key="${escape(key)}", oauth_callback="${escape('https://127.0.1.1/auth')}", oauth_nonce="${escape(nonce)}", oauth_signature="${escape(signature)}", oauth_signature_method="${method}", oauth_timestamp="${seconds}", oauth_token="${escape(access_token)}", oauth_version="${version}"`

  console.log(headerString);

  var options = {
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
    headers: {
      'Authorization': headerString
    }
  };

  request(options, function (error, response, body) {
    console.log(body)
  })
});

router.get('/auth', function(req, res){
  console.log(req.body);
})

module.exports = router;

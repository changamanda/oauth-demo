var express = require('express');
var router = express.Router();

var request = require('request');
var querystring = require('querystring');

router.get('/', function(req, res) {
  res.render('index', {title: "Instagram"})
});

router.get('/auth', function(req, res){
  var body = {
    client_id: process.env.INSTAGRAM_ID,
    client_secret: process.env.INSTAGRAM_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000/auth',
    code: req.query.code
  }

  var options = {
    url: 'https://api.instagram.com/oauth/access_token',
    method: 'POST',
    body: querystring.stringify(body)
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(`Welcome, ${JSON.parse(body).user.username}!`);
    }
  })
})

module.exports = router;

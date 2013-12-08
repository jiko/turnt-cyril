// it's fukcing node yall

var fs = require('fs');
var Twit = require('twit');
var T = new Twit(require('./config.js'));
var start = 0;
var interval = 1000 * 60 * 60;

function tweet(text) {
    T.post('statuses/update', { status: text }, function(err, reply) {
        if (err) {
          console.log('error: ', err);
        } else {
          console.log('reply: ', reply);
        }
    });
}

function sing(tweets, index) {
    setTimeout(function () {
        if (index === tweets.length)
            index = 0;
        tweet(tweets[index++]);
        sing(tweets, index);
    }, interval);
}

var text = fs.readFile('./IsingTheBodyElectric.txt', {"encoding":"utf8"}, function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    sing(lines, start);
});

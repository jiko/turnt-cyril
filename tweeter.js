// it's fukcing node yall

var fs = require('fs');
var Twit = require('twit');
var T = new Twit(require('./config.js'));

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
        if (index === tweets.length) index = 0;
        tweet(tweets[index++]);
        //console.log(tweets[index++]);
        sing(tweets, index);
    }, 1000 * 60 * 60);
}

var text = fs.readFile('./IsingTheBodyElectric.txt', {"encoding":"utf8"}, function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    var count = 1;
    sing(lines, count);
});

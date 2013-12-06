// it's fukcing node yall

var fs = require('fs');
var schedule = require('node-schedule');
var Twit = require('twit');
var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET  
});

function tweet(text) {
    T.post('statuses/update', { status: text }, function(err, reply) {
        if (err) {
          console.log('error: ', err);
        } else {
          console.log('reply: ', reply);
        }
    });
}

var lines = [];
var text = fs.readFile('./IsingTheBodyElectric.txt', {"encoding":"utf8"}, function (err, data) {
    if (err) throw err;
    lines = data.split("\n");
});

var length = lines.length;
var count = 0;
var times = new schedule.RecurrenceRule();
times.hour = new schedule.Range(6,17);
times.minute = 0;

var tweets = schedule.scheduleJob(times, function () {
    tweet(lines[count]);
});

var fs = require('fs');
var lines = [];
var text = fs.readFile('./IsingTheBodyElectric.txt', {"encoding":"utf8"}, function (err, data) {
    if (err) throw err;
    lines = data.split("\n");
});

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

var schedule = require('node-schedule');
var length = lines.length;
var count = 0;
var times = new schedule.RecurrenceRule();
times.hour = new schedule.Range(6,17);
times.minute = 0;
var tweets = schedule.scheduleJob(times, function () {
    if (count < length) {
        count++;
    } else {
        count = 0;
    }
    tweet(lines[count]);
});
`
var express = require('express');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
    response.send('I sing the body electric,');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

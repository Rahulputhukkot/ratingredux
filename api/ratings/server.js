var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('../../src/config.js');

const RATINGS_FILE = path.join(__dirname, config.ratings.filename);

app.set('port', (process.env.PORT || 3030));

//app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


app.post('/api/ratings', function(req, res) {
  fs.readFile(RATINGS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (req.body.type === 'read') {
      res.json(JSON.parse(data));
    } else if (req.body.type === 'write') {
      var rates = JSON.parse(data);
      var d = new Date();
      const datenew = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      var newRates = {
        id: Date.now(),
        timestamp: datenew,
        rating: req.body.rating,
        description: req.body.description,
        email: req.body.email,
      };
      rates.push(newRates);
      fs.writeFile(RATINGS_FILE, JSON.stringify(rates, null, 4), function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        res.json(data);
      });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

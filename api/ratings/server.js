/* eslint-disable */
'use strict';
/* eslint-enable */
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('../../src/config.js');

const RATINGS_FILE = path.join(__dirname, config.ratings.filename);

app.set('port', (process.env.PORT || 3030));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function allowCors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


app.post('/api/ratings', function processRatings(req, res) {
  fs.readFile(RATINGS_FILE, 'utf8', function readCallback(readError, data) {
    if (readError) {
      console.error(readError);
      process.exit(1);
    }
    if (req.body.type === 'read') {
      const rowRead = data;
      const sp = rowRead.split('\n').slice(0, -1);
      const newData = [];
      const keys = ['email', 'rating', 'timestamp', 'desc'];
      let valueToReturn;
      sp.forEach(line => {
        valueToReturn = {};
        line.split(',').forEach((value, index) => (valueToReturn[keys[index]] = decodeURIComponent(value)));
        newData.push(valueToReturn);
      });
      res.json(newData);
    } else if (req.body.type === 'write') {
      const rates = data;
      const presentDate = new Date();
      const dateParts = [
        presentDate.getFullYear(),
        presentDate.getMonth(),
        presentDate.getDate(),
        presentDate.getHours(),
        presentDate.getMinutes(),
        presentDate.getSeconds()
      ];
      const valueToSave = {
        email: req.body.email,
        rating: req.body.rating,
        timestamp: `${dateParts[0]}-${dateParts[1]}-${dateParts[2]} ${dateParts[3]}:${dateParts[4]}:${dateParts[5]}`,
        desc: req.body.desc,
      };
      const rowToWrite = Object.values(valueToSave).map(value => encodeURIComponent(value)).join(',');
      const newRates = rates + rowToWrite + '\n';
      fs.writeFile(RATINGS_FILE, newRates, function writeCallback(writeError) {
        if (writeError) {
          console.error(writeError);
          process.exit(1);
        }
        res.json([valueToSave]);
      });
    }
  });
});

app.listen(app.get('port'), function appStartCallback() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

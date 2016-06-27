var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('URL SHORTENER MICROSERVICE');
});

app.listen('3000');

var express = require('express');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/url-shortener');
require('./models/Url');

const Url = mongoose.model('url');

var app = express();

app.get('/*', (req, res) => {
  res.send('URL SHORTENER MICROSERVICE');
  parseUrl(req.url.substring(1))
});

app.listen('3000');

const parseUrl = url => {
	console.log(url)

	if (checkShort(url))
		redirectTo(url)
	else if (checkUrl(url))
		shortUrl(url)
	else
		sendErr('invalid request')
}

const shortUrl = url => {
	const newUrl = new Url({ original_url: url, short_url: +Date.now() });
  newUrl.save();
  return newUrl;
}

const redirectTo = shortUrl => {
	// Lire dans la BDD l'URL
}

const sendErr = error => {
	res.send({ error })
}

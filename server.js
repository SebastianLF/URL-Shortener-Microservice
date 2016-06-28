var express = require('express');
var mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);
require('./models/Url');

const Url = mongoose.model('url');

var app = express();

app.get('/*', (req, res) => {
  res.send('URL SHORTENER MICROSERVICE');
  parseUrl(req.url.substr(1))
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

const checkShort = url => {
	return url.match(/^\d+$/)
}

const checkUrl = url => {
	return url.toLowerCase().match(/^https?:\/\/(?:www.)?\w+\.[a-z]+(?::[0-9]+)?$/)
}

const shortUrl = url => {
  const newUrl = new Url({ original_url: url, short_url: process.env.BASE_URI + Date.now() });
  newUrl.save();
  return newUrl;
}

const redirectTo = shortUrl => {
	console.log('redirect')
	// Lire dans la BDD l'URL
}

const sendErr = error => {
	res.send({ error })
}


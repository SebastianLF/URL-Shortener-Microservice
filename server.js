var express = require('express');
var app = express();

app.get('/*', (req, res) => {
  res.send('URL SHORTENER MICROSERVICE');
  parseUrl(req.url.substr(1))
});

app.listen('3000');

const parseUrl = url => {

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
	console.log('shortUrl')
	// Ecrire l'URL dans la BDD
}

const redirectTo = shortUrl => {
	console.log('redirect')
	// Lire dans la BDD l'URL
}

const sendErr = error => {
	console.log(error)
	// Renvoyer une erreur
}
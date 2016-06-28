var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// Chargement des variables d'environnement situés dans le fichier '.env'.
require('dotenv').config();

// Connexion à la bnase de données mongodb.
mongoose.connect(process.env.MONGO_URI);
require('./models/Url');
const Url = mongoose.model('url');

// création du seveur.
var app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/*', (req, res) => {
  parseUrl(req.url.substr(1))
  res.send('URL SHORTENER MICROSERVICE');
});

app.listen(process.env.PORT);

// fonctions.
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
  const newUrl = new Url({ original_url: url, short_url: process.env.BASE_URI + Date.now() });
  newUrl.save();
  return newUrl;
}

const redirectTo = shortUrl => {
	console.log('redirect')
	// Lire dans la BDD l'URL
}

const sendErr = error => {
  console.log(error);
}

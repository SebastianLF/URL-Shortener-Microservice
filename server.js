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

// gestion de template.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/*', (req, res) => {
  parseUrl(req.url.substr(1), req, res)
});

// ecoute du serveur.
app.listen(process.env.PORT);

// fonctions.
const parseUrl = (url, req, res) => {
	if (checkShort(url)) {
		const originalUrl = redirectTo(url);
    res.redirect(originalUrl);
  }
	else if (checkUrl(url)) {
    const newUrl = shortUrl(url);
    res.json(newUrl)
  }
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
  const shortUrl_id = Date.now();
  const newUrl = new Url({ original_url: url, short_url: process.env.BASE_URI + shortUrl_id, short_url_id: shortUrl_id });
  newUrl.save();
  return newUrl;
}

const redirectTo = (shortUrlId) => {
  Url.findOne({short_url_id: shortUrlId}, (err, url) => {
    return url.original_url;
  });
}

const sendErr = error => {
  console.log(error);
}

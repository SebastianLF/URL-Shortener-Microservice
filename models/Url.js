var mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
});

mongoose.model('url', UrlSchema);

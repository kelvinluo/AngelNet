var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:12345/test', {
  user: 'testAdmin',
  pass: 'password'
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
});

var BookSchema = mongoose.Schema({
  title: {type: String, trim: true},
  authors: [
    {
    first: String,
    middle: String,
    last: String
  }
  ],
  year: Number
});

var Books = mongoose.model('Books', BookSchema);

router.get('/', function(req, res) {
  // Lists the books.
});

// This should use POST but we use GET for brevity.
router.get('/new', function(req, res) {
  // Creates a new book.
});

// This should use POST but we use GET for brevity.
router.get('/delete/:id', function(req, res) {
  // Deletes a book using its ID.
});

router.get('/:id', function(req, res) {
  // Returns the information of a particular book.
});

module.exports = router;

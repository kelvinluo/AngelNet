var mongoose = require('mongoose');

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

//To connect to MongoDB's  database
mongoose.connect('mongodb://localhost/csc309', {
  user: '',
  pass: ''
});

//check the status of this connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
});

// Creates the model for Books.
var Books = mongoose.model('Books', BookSchema);

//To create an instance from a model, we can simply call new on the model.
// Instantiates a new Book. It's still not in the DB.
var insBook = new Books({
  title: 'Introduction to Algorithms',
  authors: [
    {
      first: 'Thomas',
      middle: 'H.',
      last: 'Cormen'
    },
    {
      first: 'Charles',
      middle: 'E.',
      last: 'Leiserson'
    },
    {
      first: 'Ronald',
      middle: 'L.',
      last: 'Rivest'
    },
    {
      first: 'Clifford',
      last: 'Stein'
    }
  ],
  year: 1990
})

//The instnace is not saved in the DB yet. Let's try to save it using `save`:
// Tries to save the book in the DB.
insBook.save(function (err) {
	  if (err) {
	    console.log(err);
	    return;
	  }

	  // Now it's saved!
	  console.log('Saved book instance: ' + insBook);

	  Books.find({}, function(err, book) {
	    if (err) {
	      console.log(err);
	      return;
	    }

	    console.log('\n\n Found book instance: ' + book);
	   });
 });

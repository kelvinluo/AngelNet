### Schemas & Models
`mongoose` you can define the structure of your data using a `schema` which is simply a dictionary of fields in your data. Let say we want to model a system to store books. For that we need to define a `Book` schema:

```js
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
```

In this schema, a Book is defined to have a `title`, an array of `authors` and a publication `year`. `title` is a string that will be automatically trimmed if needed. `authors` is a array of first name, middle name, and last name of authors. And year is simply a number.

Using an schema, you can build models. Models are like JavaScript classes that you can instantiate from, save them in the DB, ...:

```js
// Creates the model for Books.
var Books = mongoose.model('Books', bookSchema);
```

To create an instance from a model, we can simply call new on the model:
```js
// Instantiates a new Book. It's still not in the DB.
var clrs = new Books({
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
```
The instnace is not saved in the DB yet. Let's try to save it using `save`:
```js
// Tries to save the book in the DB.
clrs.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }

  // Now it's saved!
  console.log('Saved : ' + clrs);
});
```

Now to double-check if it's in the DB, we can find it using its automatically assigned ID, `_id`:

```
clrs.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }

  // Now it's saved!
  console.log('Saved : ' + clrs);

  // Let's retrieve it using its ID.
  Books.findById(clrs._id, function(err, book) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Found CLRS: ' + book);
  });
});
```

When put together, it'll look like this:
```js
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

var bookSchema = mongoose.Schema({
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


var Books = mongoose.model('Books', bookSchema);

var clrs = new Books({
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

clrs.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Saved : ' + clrs);

  Books.findById(clrs._id, function(err, book) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Found CLRS: ' + book);
  });
});
```

## Express + Mongoose 
*It is assumed that you know how to use express.js.*

Let's create a web app that allows us to create, list, update, and delete books. To do so, we'll use `express` and `mongoose`.

### Router
In your exress application, create a router that handles `/books` in `routes/books.js`:
```js
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
```

In the books router we have:
- defined the schema.
- defined the model.
- defined routes for listing, creating, deleting, and reading a book.

#### NOTE: The urls we use here are mainly for your convinience. In your projects you must use appropritate verbs (e.g., POST, PATCH, ...).

### /books/new
Let's implement `new` first. To create a book and store in the DB, we simply need to instantiate the model and then save it into our mongodb server:
```js
// This should use POST but we use GET for brevity.
router.get('/new', function(req, res) {
  // Instanitate the model.
  var book = new Books({
    title: req.query.title,
    authors: [
      {
        first: req.query.first,
        middle: req.query.middle,
        last: req.query.last,
      }
    ],
    year: req.query.year
  });

  // Save it to the DB.
  book.save(function(err) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    // If everything is OK, then we return the information in the response.
    res.send(book);
  });
});
```

To test this feature, restart your express app and then browse to http://HOST:PORT/books/new?title=Sometitle&first=Me&last=You&year=2014

Change the request parameters to create other books!

# /books/
Now let's implement the feature that allows us to list all the books stored in the DB. To do so, all you need to do is calling `Books.find`:

```js
router.get('/', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    // Send the books back to the user.
    res.send(books);
  });
});
```

To test this feature, restart your express app and then browse to http://HOST:PORT/books/

Do you see the book you just created?

# /books/:id
Now let's try to return the information of a single book. To do so, we first get the ID from the user request and then we use `Books.findById` to retrieve the book:
```js
router.get('/:id', function(req, res) {
  Books.findById(req.params.id, function(err, book) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    // If the book is not found, we return 404.
    if (!book) {
      res.status(404).send('Not found.');
      return;
    }

    // If found, we return the info.
    res.send(book);
  });
});
```

Find a book ID, and try it by using http://HOST:PORT/books/ID in your browser.

# /books/delete/:id
Deleting a book is very similar to finding one. You just need to call `Books.remove`:

```js
router.get('/delete/:id', function(req, res) {
  Books.remove({_id: req.params.id}, function(err) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    res.send('Deleted.');
  });
});
```

Super easy, eh? 

## Exercise
Modify `/books/new` to be able to get an array of authors not only one author. 
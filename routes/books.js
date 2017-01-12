var knex = require('../db/knex');
var express = require('express');
var router = express.Router();
var queries = require('../queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  queries.getBooks().then(function(books) {
    res.render('books', {books: books})
  })
});


// router.get('/new', function(req, res, next) {
//   knex('books')
//   .join('author_books', 'author_books.author_id', 'author.id')
//   .join()
//   .then(books => res.json(books))
// })

// router.get('/new', function(req, res, next) {
//   queries.getBooks().then(function(books) {
//     res.render('addbook')
//   })
// });

router.get('/new', function(req, res, next) {
  knex('books').then(books=> res.render('addbook'))
})

router.post('/new', function(req, res, next)  {
  var book_body = {
    title: req.body.title,
    genera: req.body.genera,
    description: req.body.description,
    img: req.body.img
  }
  if (req.body.title.trim().length > 0 && req.body.genera.trim().length > 0) {
      queries.newBook(book_body).then(function(result){
      res.send(result)
      // res.redirect(/:id)
    })
  } else {
    next(new Error('invalid book'));
  }
})





module.exports = router;

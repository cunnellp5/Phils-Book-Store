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

router.get('/:id', function(req, res, next) {
  queries.getOneBook(req.params.id).then(function(books) {
    res.render('single', {books: books})
  })
});

// DELETE
router.get('/:id/delete', function(req, res, next) {
  queries.getOneBook(req.params.id).then(function(books) {
    res.render('delete', {books: books})
  })
});
router.delete('/:id/delete', function(req, res, next) {
  knex('books').where('id', req.params.id).first().del()
  .then(()=>{
    res.redirect('/books')
  })
})

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
// PUT or UPDATE
router.get('/:id/edit', function(req, res, next) {
  queries.getOneBook(req.params.id).then(function(books)  {
    res.render('edit', {books:books})
  })
})
router.put('/:id/edit', function(req, res, next)  {
  var book_body = {
    title: req.body.title,
    genera: req.body.genera,
    description: req.body.description,
    img: req.body.img
  }
  if (validate(req.body)) {
      queries.editBook(book_body, req.params.id).then(function(result){
      res.redirect('/books')
      // res.redirect(/:id)
    })
  } else {
    next(new Error('😡'));
  }
})

// POST
router.get('/new', function(req, res, next) {
  knex('books').then(books => res.render('addbook'))
})
router.post('/new', function(req, res, next)  {
  var book_body = {
    title: req.body.title,
    genera: req.body.genera,
    description: req.body.description,
    img: req.body.img
  }
  if (validate(req.body)) {
      queries.newBook(book_body).then(function(result){
      res.redirect('/books')
      // res.redirect(/:id)
    })
  } else {
    next(new Error('invalid book'));
  }
})

function validate(book){
  return typeof book.title == 'string' &&
  book.title.trim() != '' &&
  typeof book.genera == 'string' &&
  book.genera.trim() != '';
}



module.exports = router;

var express = require('express');
var router = express.Router();
var queries = require('../queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  queries.getBooks().then(function(books) {
    res.render('books', {books: books})
  })
});

module.exports = router;

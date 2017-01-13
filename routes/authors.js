var knex = require('../db/knex');
var express = require('express');
var router = express.Router();
var queries = require('../queries');

/* GET authors listing. */
router.get('/', function(req, res, next) {
  queries.getAuthors().then(function(authors) {
    res.render('authors', {authors: authors})
  })

});

module.exports = router;

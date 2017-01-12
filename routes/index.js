var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Phils Books',
    logo: '../images/book_logo.png'
   });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pizzaDescription = require('../data/pizzaDescription');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', pizzaDescription);
});

router.get('/order', function(req, res, next) {
  res.render('order', pizzaDescription);
});

module.exports = router;

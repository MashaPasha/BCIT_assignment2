const express = require('express');
const router = express.Router();
const pizzaDescription = require('../data/pizzaDescription');


router.get('/', (req, res) =>{  
  res.redirect('add-order');
});

router.get('/add-order', function(req, res, next) {
  res.render('add-order', pizzaDescription);
});

router.get('/orders', function(req, res, next) {
  res.render('orders', pizzaDescription);
});

module.exports = router;

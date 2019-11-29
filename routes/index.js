const express = require('express');
const router = express.Router();
const pizzaDescription = require('../data/pizzaDescription');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', pizzaDescription);
});

router.get('/get-data', function (req, res, next){

});

router.post('/insert', function (req, res, next) {

});

module.exports = router;

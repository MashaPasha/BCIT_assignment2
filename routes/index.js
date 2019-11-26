let express = require('express');
let router = express.Router();
let mongo = require('mongodb');
let assert = require('assert');

let url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pizza' });
});

router.get('/get-data', function (req, res, next){

});

router.post('/insert', function (req, res, next) {

});

module.exports = router;

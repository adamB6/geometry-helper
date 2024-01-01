var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('circles', { title: 'Areas and Perimeters of Circles', PI: 3.141592653589793 });
});

module.exports = router;
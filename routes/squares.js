var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('squares', {formData : req.query, title : 'Areas and perimeters of Squares'});
});

module.exports = router;
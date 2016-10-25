var express = require('express');
var router = express.Router();
var jd=require('../customers.json');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end(JSON.stringify(jd));
});

module.exports = router;

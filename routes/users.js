var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://root:root@ds040349.mlab.com:40349/lastdb';
var result;
var i=0;

var findRestaurants = function(db, callback) {
  var cursor =db.collection('sample').find( { "index": i%100 } );
  i+=1;
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
      result=doc;
    } else {
      callback();
    }
  });
};


router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function() {
      db.close();
    });
  });
  res.end(JSON.stringify(result));
});

module.exports = router;

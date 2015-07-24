var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Parallel = mongoose.model('Parallel');

router.get('/parallel', function(req, res, next) {
  Parallel.find(function(err, results) {
    if(err) { return next(err);}
    res.json(results);
  });
});

router.post('/parallel', function(req, res, next) {
  var par = new Parallel(req.body);
//  console.log("In Post");
//  console.log(par);
//  console.log(req.body);

  par.save(function(err, par) {
  if(err) { 
//    console.log("Error"); 
    for(field in err.errors) {
//      console.log(err.errors[field].message);
    }
  }
//  console.log("After Save");
  res.json(par);
  });
});

router.delete('/parallel/:id', function(req, res, next) {
//  console.log("In delete");
//  console.log(req.params.id);
  Parallel.findOne({_id:req.params.id}).exec(function (err, docs) {
    if(err) { 
//      console.log("Error"); 
      for(field in err.errors) {
//        console.log(err.errors[field].message);
      }
    } else {
      if(docs) {
        docs.remove();
      }
    }
//    console.log("After err in Delete");
//    console.log(docs);
  });
//  console.log("After Delete");
  res.json();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

let router = require("express").Router();
let joke = require('../models/Jokes');
let ObjectID = require('mongodb').ObjectID;

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

//GET

router.get("/jokes", (req, res, next) => {
  joke.find([], function (err, data) {
    if (err) {
      return next();
    }
    res.json(data);
  });
});

//GET BY ID

router.get("/jokes/:id", (req, res, next) => {
  joke.findById({ _id: req.params.id }, function (err, data) {
    if (err) {
      return next();
    }
    res.json(data);
  });
});

//POST

/*router.post("/jokes/", (req, res, next) => {
  var newJoke = {
    joke: req.body.joke,
    category: req.body.category,
    reference: req.body.reference
  };
  joke.create(newJoke);
  joke.find({
    joke: req.body.joke,
    category: req.body.category,
    reference: req.body.reference
  }, function (err, data) {
    if (err) {
      return next();
    }
    res.json(data);
  })
});*/

/*
router.post("/jokes/", (req, res, next) => {
  //opret joke-objekt
  var newJoke = new joke; 
  
    newJoke.joke = req.body.joke;
    newJoke.category = req.body.category;
    newJoke.reference = req.body.reference;
  //gem joke
  newJoke.save(function(err){
    if(err){
      throw err;
    }
  });
  //find og returner joke
  joke.find({
    joke: req.body.joke,
    category: req.body.category,
    reference: req.body.reference
  }, function (err, data) {
    if (err) {
      return next();
    }
    res.json(data);
  })
});*/

router.post('/jokes', function (req, res, next) {
  let newJoke = new joke;

  newJoke.joke = req.body.joke;
  newJoke.category = req.body.category;
  newJoke.reference = req.body.reference;

  newJoke.save(function (err, data) {
    if (err) {
      next();
    }
    res.json(data);
  })
});

//PUT


router.put('/jokes/:id', (req, res, next) => {

  //finds joke by id
  joke.findById({ _id: req.params.id }, function (err, foundJoke) {
    if (err) {
      throw next();
    }

    foundJoke.save(function (err) {
      if (err) {
        next();
      }
      res.json(foundJoke);
    })
  });
});

//DELETE

router.delete('/jokes/:id', (req, res, next) => {

  //finds joke by id
  joke.findById({ _id: req.params.id }, function (err, foundJoke) {
    if (err) {
      throw next();
    }

    foundJoke.remove(function (err) {
      if (err) {
        next();
      }
      res.status(204).send();
    })
  });
});

module.exports = router;
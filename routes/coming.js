const express = require('express');
const {Coming} = require('../models');
const router = express.Router();

router.get('/', async(req, res, next) => {
  try{
    res.render('coming');
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/', async(req, res, next) => {
  try{
    const result = Coming.create({
      title: req.body.title,
      singer: req.body.singer,
      album: req.body.album,
      Date: req.body.date
    });
    res.redirect('/');
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;

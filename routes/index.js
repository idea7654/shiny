const express = require('express');
const {Song, Review} = require('../models');
const router = express.Router();

router.get('/', async(req, res, next) => {
  try{
    const result = await Review.findAll({ limit: 10, order: [['createdAt', 'DESC']]});
    //res.json(result);
    res.render('index', {title: 'Express', result: result});
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;

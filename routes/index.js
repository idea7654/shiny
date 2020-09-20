const express = require('express');
const {Song, Review, Coming, Announce} = require('../models');
const router = express.Router();

router.get('/', async(req, res, next) => {
  try{
    const resultReview = await Review.findAll({ limit: 10, order: [['createdAt', 'DESC']]});
    const resultSong = await Song.findAll({ limit: 10, order: [['createdAt', 'DESC']]});
    const comingSong = await Coming.findAll({ limit: 10, order: [['createdAt', 'DESC']]});
    const announce = await Announce.findAll({ limit: 10, order: [['createdAt', 'DESC']]});

    res.render('index', {
      title: 'Express',
      resultReview: resultReview,
      resultSong: resultSong,
      comingSong: comingSong,
      announce: announce
    });
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;

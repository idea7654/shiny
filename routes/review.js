const express = require('express');
const {Song, Review} = require('../models');
const router = express.Router();
//song.ejs render후 id값을 받아와 그에 해당하는 song정보와 review를 가져옴
router.get('/', async(req, res, next) => {
  try{
    const result = await Review.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.render('review/reviewList', {result: result});
  }catch(err){
    console.error(err);
    next(err);
  }
});
/*
router.get('/:id', async(req, res, next) => {
  const id = req.params.id;
  try{
    const review = await Review.findAll({
      include: {
        model: Song,
        where: { id: req.params.id }
      }
    });
    res.redirect(`song/${id}`);
    console.log(review.reviewtitle);
  }catch(err){
    console.error(err);
    next(err);
  }
});*/

router.post('/', async(req, res, next) => {
  try{
    const result = await Review.create({
      reviewtitle: req.body.id,
      review: req.body.review,
      score: req.body.score
    });
    res.redirect(`song/${req.body.id}`);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.patch('/:id', async(req, res, next) => {
  try{
    const result = await Review.update({
      review: req.body.review
    }, {where: {id: req.params.id}});
    res.json(result);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/:id', async(req, res, next) => {
  try{
    const result = await Review.delete({
      where: {id: req.params.id}
    });
    res.json(result);
  }catch(err){
    console.error(err);
    next(err);
  }
}); //delete요청은 Ajax로 처리해야함.

module.exports = router;

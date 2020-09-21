const express = require('express');
const {Announce} = require('../models');
const router = express.Router();
const sequelize = require('sequelize');
//const Op = sequelize.Op;

router.get('/', (req, res) => {
  res.render('announce');
});

router.get('/list', async(req, res, next) => {
  try{
    const result = await Announce.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.render('announceList', {result: result});
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/:id', async(req, res, next) => {
  const id = req.params.id;
  try{
    const page = await Announce.findAll({
      where: {
        id: id
      }
    });
    res.render('announceInfo', {page: page[0]});
    console.log(page);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/', async(req, res, next) => {
  try{
    const result = await Announce.create({
      title: req.body.title,
      announce: req.body.announce
    });
    res.redirect('announceList');
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;

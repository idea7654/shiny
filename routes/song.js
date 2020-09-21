const express = require('express');
const {Song} = require('../models');
const router = express.Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;

router.get('/', (req, res) => {
  res.render('song');
});

router.get('/list', async(req, res, next) => {
  try{
    const result = await Song.findAll({order: [['createdAt', 'DESC']]});

    res.render('songList', {result: result});
  }catch(err){
    console.error(err);
    next(err);
  }
});
/*
router.get('/:songname', async(req, res, next) => {
  const songName = req.params.songname;
  try{
    const result = await Song.findAll({
      where:{
        title: {
            [Op.like]: "%" + songName + "%"
        }
      }
    });
    /* 프론트 완성되면 구현할 기능(검색값 1개일 시 바로 redirect, 아니면 나열)
    if(result == 1){
      res.redirect(`/${songName}`);
    }else{

    }
    
    res.json(result);
  }catch(err){
    console.error(err);
    next(err);
  }
}); //곡 이름으로 검색
*/
router.get('/:id', async(req, res, next) => {
  const id = req.params.id;
  try{
    const result = await Song.findAll({
      where: {
        id: id
      }
    });
    res.render('songInfo', {result: result[0]});
    console.log(result);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/', async(req, res, next) => {
  try{
    const result = await Song.create({
      title: req.body.title,
      singer: req.body.singer,
      album: req.body.album
    });
    res.redirect('songList');
  }catch(err){
    console.error(err);
    next(err);
  }
});



module.exports = router;

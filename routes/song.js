const express = require('express');
const router = express();
const sequelize = require('sequelize');
const Op = sequelize.Op;

const Song = require('../models').Song;

router.get('/', async(req, res, next) => {
  try{
    const result = await Song.findAll({});
    res.json(result);
  }catch(err){
    console.error(err);
    res.error(err);
    next(err);
  }
});

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
    */
    res.json(result);
  }catch(err){
    console.error(err);
    next(err);
  }
}); //곡 이름으로 검색


router.post('/', async(req, res, next) => {
  try{
    const result = await Song.create({
      title: req.body.title,
      singer: req.body.singer,
      album: req.body.album
    });
    res.json(result);
  }catch(err){
    console.error(err);
    next(err);
  }
});



module.exports = router;

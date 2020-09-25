const express = require('express');
const {Song} = require('../models');
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.get('/', async(req, res, next) => {
  const search = req.query.word;
  try{
    const result = await Song.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`
        }
      }
    });
    res.render('search', {result: result});
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;

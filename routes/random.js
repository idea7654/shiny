const express = require('express');
const {Song} = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');

router.get('/', async(req, res, next) => {
  try{
    const result = await Song.findAll({
      order: [Sequelize.fn('RAND')],
      limit: 1
    });
    res.redirect(`song/${result[0].id}`);
  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;

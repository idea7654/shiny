const express = require('express');
const {Song, Review} = require('../models');

const router = express.Router();
//recommend.ejs 렌더 후 제공
router.get('/', async(req, res, next) => {
  try{
    const score = await Review.findAll({
      attributes: ['score']
    });
    // var sc = res.json(score);
    var array = []; //array선언
    for (var i in score){ //score=3
      //console.log(score[i].score);
      var sc = score[i].score;
      array.push(sc);
    }
    /*
    var sum = array.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    console.log(sum);//배열의 모든값을 더해서 출력
    */


    var middleValue = array.reduce(function (accumulator, currentValue) {
      if(array.length % 2 == 0){
        return (array[array.length/2] + array[(array.length/2)+1])/2;
      }else{
        return (array[(array.length+1)/2]);
      }
    });

    var average = array.reduce((accumulator, currentValue) => {
      var result = (accumulator+currentValue)/array.length;
      if(result - (parseInt(result)) >= 0.5){
        return parseInt(result)+1;
      }else{
        return parseInt(result);
      }
    }, 0);
    res.json(middleValue);
    res.json(average);
    //res.json(sum);

  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;

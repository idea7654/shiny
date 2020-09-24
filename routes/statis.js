const express = require('express');
const {Song, Review} = require('../models');
const router = express.Router();

router.get('/', async(req, res, next) => {
  try{
    //const review = await Review.findAll();
    const song = await Song.findAll();
    const value = [];
    for (var i=0; i<song.length; i++){
      const id = song[i].id;
      const title = song[i].title;
      const score = await Review.findAll({
        //attributes: ['score'],
        where: {
          reviewtitle: id
        }
      });
      const array = [];
      for (var i in score){
        var sc = score[i].score;
        array.push(parseInt(sc));
      }
      const median = getMedian(array);
      value.push({title: title, median: median, id: id});
    }
    value.sort(function (a, b) {
      if (a.median > b.median) {
        return 1;
      }
      if (a.median < b.median) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    res.render('recommend/recommend', {value: value});
  }catch(err){
    console.error(err);
    next(err);
  }
});

function getMedian(array) {
  if (array.length == 0) return NaN; // 빈 배열은 에러 반환(NaN은 숫자가 아니라는 의미임)
  var center = parseInt(array.length / 2); // 요소 개수의 절반값 구하기

  if (array.length % 2 == 1) { // 요소 개수가 홀수면
    return array[center]; // 홀수 개수인 배열에서는 중간 요소를 그대로 반환
  } else {
    return (array[center - 1] + array[center]) / 2.0; // 짝수 개 요소는, 중간 두 수의 평균 반환
  }
}

function getAve(array) {
  let result = 0;
  for (let i = 0; i <array.length; i++) {
      result += parseInt(array[i]);
  }
  return result / array.length
}

module.exports = router;

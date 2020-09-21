const express = require('express');
const {Song, Review} = require('../models');
const router = express.Router();
const value = [];
//recommend.ejs 렌더 후 제공
/*
router.get('/:id', async(req, res, next) => {
  const id = req.params.id;
  try{
    const score = await Review.findAll({
      attributes: ['score'],
      where: {
        reviewtitle: id
      }
    });
    const song = await Song.findAll({
      attributes: ['title'],
      where: {
        id: id
      }
    });
    var array = [];
    for (var i in score){
      var sc = score[i].score;
      array.push(parseInt(sc));
    }
    var median = getMedian(array);
    var average = getAve(array);

    //res.render('recommend/recommend', {middle: middleValue, average: average});
    console.log(song[0].title, median);
    value.push({title: song[0].title, median: median});
    console.log(value);
  }catch(err){
    console.error(err);
    next(err);
  }
});
*/
router.get('/list', async(req, res, next) => {
  try{
    //const review = await Review.findAll();
    const song = await Song.findAll();

    for (var i=0; i<song.length; i++){
      const id = song[i].id;
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
      console.log(median);
    }
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

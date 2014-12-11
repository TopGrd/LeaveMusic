var express = require('express');
var router = express.Router();
var http = require('http');
var data = '';
var tweets = '';
var urls='';
var options = {
  host: 'app.atime.me',
  port: 80,
  path: '/music-api-server/?p=xiami&t=collect&i=29880236&q=high'
};

/* GET home page. */

var request =http.get(options,function(res){
  /*res.setHeader("Set-Cookie", ['appver=1.5.2']);*/
  res.on('data',function(chunck){
    data += chunck;
  });

  res.on('end',function(){
    tweets = JSON.parse(data);
    urls = tweets.songs;
    console.log(urls)
  });
  res.on('error',function(e){
    console.log(e.message);
  });

});

router.get('/', function(req, res) {
  res.render('index', { urls: urls });
});
module.exports = router;

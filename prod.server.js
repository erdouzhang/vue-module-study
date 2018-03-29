/**
 * Created by erdou on 2018/3/29.
 */
var express = require('express');
var config = require('./config/index');
var port = process.env.PORT || config.build.port;

var app = express();

var appData = require("./data.json");

var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();


apiRoutes.get('/' ,function (req, res, next) {
     req.url = 'index.html';
     next();
});

app.use(apiRoutes);

app.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  });//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
});
  app.get('/api/goods', (req, res) => {
    res.json({
      errno: 0,
      data: goods
    });
  });

  app.get('/api/ratings', (req, res) => {
    res.json({
      errno: 0,
      data: ratings
    });
  });

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
      if(err){
        console.log(err);
        return;
      }
  console.log('Listening at http://localhost:' + port + '\n')
});



var express = require('express');
var config = require('./config');
var request = require('request');
// querystring.parse() 将查询字符串转成对象
// querystring.stringify() 将对象转成查询字符串
var qstring = require('querystring');
var path = require('path');

var app = express();

app.use(express.static(config.staticPath));
app.use(express.static(path.join(__dirname, 'node_modules')));

// app.get('/in_theaters', function(req, response, next) {
//   request('https://api.douban.com/v2/movie/in_theaters',(err, res, body) => {
//     if (err) {
//       throw err;
//     }
//     if (res.statusCode === 200) {
//       response.send(body);
//     }
//   });
// });

// 请求豆瓣 API
// Request 请求到的数据就是一个可读流，可以通过 pipe 管道顺着可读流发送数据
// app.get('/in_theaters', function (req, res, next) {
//   // 拿到了查询字符串
//   // console.log(req.query);
//   request(`https://api.douban.com/v2/movie/in_theaters?${qstring.stringify(req.query)}`).pipe(res);
// });
app.get('/movie/:category', function (req, res, next) {
  // 拿到了查询字符串
  // console.log(req.query);
  request(`https://api.douban.com/v2/movie/${req.params.category}?${qstring.stringify(req.query)}`).pipe(res);
});

// 后台请求 电影条目 API 接口
app.get('/movie/subject/:id', function(req, res, next) {
  request(`https://api.douban.com/v2/movie/subject/${req.params.id}`).pipe(res)
})
app.listen(config.port, config.host, function() {
  console.log(`Server is running at port ${config.port}`)
});

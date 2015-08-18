// dependencies
var express = require('express');
var csv = require('csv');
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var app = express();
var writeStream = fs.createWriteStream("file.csv");

// perfrom request
app.get('/scrape/:user', function(req, res){

  url = 'https://github.com/'+req.params.user;
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // pass DOM to cheerio
      var $ = cheerio.load(html);
      var streak = ($('.text-muted').last().text());
      console.log(streak);
      res.jsonp({ data: streak });
    }
  });
});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;

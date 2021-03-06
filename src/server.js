const express = require('express');
const fs = require('fs');
const app = express();
const url = require('url');
const path = require('path');
const port = process.env.PORT || 8080;
console.log("Client server running");
app.use('/static',express.static('../public'));
app.use(express.static('../public'));
app.use(express.static('../data'));
app.get('/',function(req,res)
{
  res.sendFile('index.html');
});
app.get('*',function(req,res)
{
  var q = url.parse(req.url,true);
  var filepath = q.pathname;
  res.sendFile('messages.txt');
});
app.post('/getdata',function(req,res)
{
  var messages = fs.readFileSync('../data/messages.txt').toString().split("\n");
  var from = fs.readFileSync('../data/from.txt').toString().split("\n");
  var dates = fs.readFileSync('../data/dates.txt').toString().split("\n");
  var subjects = fs.readFileSync('../data/subjects.txt').toString().split("\n");
  var obj = {from,subjects,messages,dates};
  res.send(JSON.stringify(obj));
});
app.listen(port);

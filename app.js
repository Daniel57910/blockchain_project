var express = require('express');
var app = express();
var path = require('path');
var Block = require('./lib/block.js');
var Chain = require("./lib/blockChain.js");
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/info', urlencodedParser, function(req, res){
  console.log(req.body);
  res.redirect('/');
});

app.listen(9000, () => console.log('Pharmacy app listening on port 9000'));

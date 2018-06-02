var express = require('express');
var app = express();
var path = require('path');
var Block = require('./lib/block.js');
var Chain = require("./lib/blockChain.js");
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
var chain = new Chain.Chain();

app.get('/', function (req, res) {
  res.render('index');
  console.log(chain);
});

app.get('/sign-up-patient', function (req, res) {
  res.render('sign_up_patient');
});

app.get('/sign-up-doctor', function (req, res) {
  res.render('sign_up_doctor');
});

app.get('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});

app.post('/info', function(req, res){
  console.log(req.param('prescription'));
  console.log(req.param('patientNames'));
  console.log(req.param('doctorName'));
  let newBlock = new Block.Block(req.param('patientNames'), req.param('doctorName'), req.param('prescription'));
  console.log(newBlock);
  chain.addBlock(newBlock);
  console.log(chain);
});

app.listen(9000, () => console.log('Pharmacy app listening on port 9000'));

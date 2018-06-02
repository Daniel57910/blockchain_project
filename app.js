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
  res.render('home');
  console.log(chain);
});

app.get('/sign-up-patient', function (req, res) {
  res.render('sign_up_patient');
});
app.post('/sign-up-patient', function (req, res) {
  res.render('sign_up_patient');
});
app.get('/sign-in-patient', function (req, res) {
  res.render('sign_in_patient');
});
app.post('/sign-in-patient', function (req, res) {
  res.render('sign_in_patient');
});

app.get('/sign-up-doctor', function (req, res) {
  res.render('sign_up_doctor');
});
app.post('/sign-up-doctor', function (req, res) {
  res.render('sign_up_doctor');
});
app.get('/sign-in-doctor', function (req, res) {
  res.render('sign_in_doctor');
});
app.post('/sign-in-doctor', function (req, res) {
  res.render('sign_in_doctor');
});

app.get('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});
app.post('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});
app.get('/sign-in-pharmacist', function (req, res) {
  res.render('sign_in_pharmacist');
});
app.post('/sign-in-pharmacist', function (req, res) {
  res.render('sign_in_pharmacist');
});

app.post('/', function (req, res) {
  res.render('home');
});

app.post('/home', function (req, res) {
  res.render('index');
});
app.get('/homepage', function (req, res) {
  res.render('index');
});
app.post('/info', function(req, res){
  console.log(req.param('prescription'));
  console.log(req.param('patientNames'));
  console.log(req.param('doctorName'));
  let newBlock = new Block.Block(req.param('patientNames'), req.param('doctorName'), req.param('prescription'));
  console.log(newBlock);
  chain.addBlock(newBlock);
  console.log(chain);
  res.render('info');
});

app.listen(9000, () => console.log('Pharmacy app listening on port 9000'));

var dependencies = require("../dependencies.js");
var app = dependencies.setupApp();
var express = require('express');
var router = express.Router();
var Chain = require("../src/blockChain.js");
var Block = require("../src/block.js");
var chain = new Chain.Chain();
var prescription = require("../src/prescription.js");

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/doctor/add_prescription', function (req, res, next) {
  if (req.session.doctorLoggedIn === true) {
    res.render('add_prescription');
  }
  else {
    req.flash('invalid_access', "Only Doctors Can Add Prescriptions!");
    res.redirect('/');
  }
});

router.post('/prescriptions/confirmation', function (req, res) {
  printTheBlockchain(chain);
  let prescr = new prescription(req.body.patientName, req.body.doctorName, req.body.prescription);
  let newBlock = new Block.Block(prescr);
  chain.addBlock(newBlock);
  req.session.chain = chain;
  res.redirect('/prescriptions/show');
});

router.get('/prescriptions/show', function (req, res, next) {
  formattedChain = req.session.chain.chain;
  data = formattedChain.map(data => data.prescription);
  res.render('prescription_stored', { prescriptions: data, test: "test"});
});

function printTheBlockchain(chain) {
  console.log("BLOCKCHAIN IS!\n");
  console.log(chain);
}

module.exports = router;

var dependencies = require("../dependencies.js");
var app = dependencies.setupApp();
var express = require('express');
var router = express.Router();
var Chain = require("../src/blockChain.js");
var Block = require("../src/block.js");
var chain = new Chain.Chain();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/add_prescription', function (req, res) {
  res.render('add_prescription');
});

router.post('/prescription_confirmation', function(req, res){
  console.log(req);
  let newBlock = new Block.Block(req.body.patientName, req.body.doctorName, req.body.prescription);
  chain.addBlock(newBlock);
  console.log(chain);
  res.render('prescription_stored');
});

module.exports = router;

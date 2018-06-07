var dependencies = require("../dependencies.js");
var app = dependencies.setupApp();
var express = require('express');
var router = express.Router();
var Chain = require("../src/blockChain.js");
var Block = require("../src/block.js");
var chain = new Chain.Chain();
var prescription = require("../src/prescription.js")

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/doctor/add_prescription', function (req, res, next) {
  res.render('add_prescription')
});

router.post('/prescriptions/confirmation', function(req, res){
  console.log(req);
  let prescr = new prescription(req.body.patientName, req.body.doctorName, req.body.prescription);
  let newBlock = new Block.Block(prescr);
  chain.addBlock(newBlock);

 console.log("chain before is \n" + chain);
 console.log(chain);
 req.session.chain = chain;
 console.log(req.session.chain);
  res.redirect('/prescriptions/show')
});
  router.get('/prescriptions/show', function(req, res, next) {
   console.log("SESSION REQUEST");
   console.log(req.session.chain);
   console.log("BEFORE PROCESSING");
   formattedChain = req.session.chain.chain;
   console.log(formattedChain);
   data = formattedChain.map(data => data.prescription);
   console.log("AFTER MAPPING");
   console.log(data);
   res.render('prescription_stored');
  });
module.exports = router;

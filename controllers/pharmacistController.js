var express = require('express');
var router = express.Router();
var pharmacistSchema = require('../models/pharmacistModel');


var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());

router.get('/sign-up-pharmacist', function (req, res) {
  res.render('pharmacist_views/sign_up_pharmacist');
});
router.get('/sign-in-pharmacist', function (req, res) {
  res.render('pharmacist_views/sign_in_pharmacist');
});

router.post('/pharmacist_signed', function (req, res) {
  savePharmacist(req);
  res.redirect('/');
});

function savePharmacist(req) {
   let savedPharmacist = new pharmacistSchema({
     userName: req.body.userName,
     dob: req.body.dob,
     password: req.body.password
   });
   savedPharmacist.save(function (err, res) {
     if (err) throw "ERROR";
     console.log("SAVED\n" + savedPharmacist);
   });
}

module.exports = router;
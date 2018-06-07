var express = require('express');
var router = express.Router();
var patientSchema = require('../models/patientModel.js');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/patient/new_registration', function (req, res) {
  res.render('../views/patient_views/sign_up_patient');
});

router.post('/patient/new_registration', function (req, res, next) {
  if (req.body.password !== req.body.confirm_password) {
    var err = 'Password not confirmed do not match.';
    return next(err);
  }

  if (req.body.userName && req.body.dob && req.body.password) {
    patientSchema.findOne({userName: req.body.userName, password: req.body.password}, function(err, obj) {savePatient(req);});
    res.redirect('/patient/prescriptions/');
  }
  else {
    console.log("INVALID PATIENT LOGIN");
    res.redirect('/patient/new_registration/');
  }

});

router.get('/patient/sign_in', function (req, res) {
  res.render('../views/patient_views/sign_in_patient');
});

router.post('/patient/sign_in/:id', function(req, res, next) {
  if (req.body.userName && req.body.password) {
    patientSchema.authenticate(req.body.userName, req.body.password, function(error, patient) {
      if (error || !patient) {
        var err = new Error("Wrong name and/or password");
        return next(err);
      }
      else {
        req.session.patientUserName = patient.userName;
        console.log(req.session.patientUserName);
        res.redirect('/patient/prescriptions');
      }

    });
  }
});

router.get('/patient/prescriptions', function(req, res, next) {
  res.send('Hello');

});


module.exports = router;

function savePatient(req) {
  console.log(req);
  let savedPatient = new patientSchema({
    userName: req.body.userName,
    dob: req.body.dob,
    password: req.body.password
  });
  savedPatient.save(function (err, res) {
    if (err) throw "ERROR";
    console.log("SAVED\n" + savedPatient);
  });
}

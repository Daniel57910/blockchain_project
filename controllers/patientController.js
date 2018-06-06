var express = require('express');
var router = express.Router();
var patientSchema = require('../models/patientModel.js');
var loggedInPatient = require('../src/patient.js');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/sign-up-patient', function (req, res) {
  res.render('../views/patient_views/sign_up_patient');
});

router.post('/patient_signed', function (req, res) {
  savePatient(req);
  res.redirect('/');
});

router.get('/sign-in-patient', function (req, res) {
  res.render('../views/patient_views/sign_in_patient');
});

router.post('/patient_logged_in', function(req, res) {
  console.log(req.body);
  patientSchema.findOne({userName: req.body.userName, password: req.body.password}, function(err, obj) { logPatientIn(obj);} );
  res.redirect('/');

});


module.exports = router;

function logPatientIn(obj) {
  console.log(obj.userName);
  loggedInPatient = new loggedInPatient(obj.userName, obj.dob, obj.password);
  console.log("logged in patient is \n" + loggedInPatient.name + " " + loggedInPatient.ID + " " + loggedInPatient.password);
}

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
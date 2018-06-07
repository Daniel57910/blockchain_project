var express = require('express');
var router = express.Router();
var doctorSchema = require('../models/doctorModel.js');
var loggedInDoctor = require('../src/doctor.js');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/doctor/new_registration', function (req, res, next) {
  res.render('../views/doctor_views/sign_up_doctor');
});

router.get('/doctor/sign_in', function(req, res, next) {
  res.render('../views/doctor_views/sign_in_doctor', {incorrectSignIn: req.flash('signUpError')});
});

router.post('/doctor/sign_in/:id', function (req, res, next) {
  if (validSignIn(req)) {
    authenticateDoctor(req);
  }
  else {
    console.log("error with doctor sign_in");
    req.flash('signUpError', "Error With Doctor Signing In");
    res.redirect('/doctor/sign_in');
  }
});

router.post('/doctor/new_registration/', function (req, res, next) {
  console.log("CHECKING ROUTE");
  if (req.body.password !== req.body.confirm_password) {
    var err = 'Password not confirmed do not match.';
    return next(err);
  }
  if (req.body.fullName && req.body.ID && req.body.password && req.body.confirm_password) {
    doctorSchema.findOne({fullName: req.body.fullName, password: req.body.password}, function(err, obj) {saveDoctor(req);} );
    res.redirect('/doctor/add_prescription');
  }
  else {
    console.log("INVALID LOGIN");
    res.redirect('/doctor/new_registration');
  }
});

function saveDoctor(req) {
  savedDoctor = new doctorSchema({
    fullName: req.body.fullName,
    doctorID: req.body.ID,
    password: req.body.password,
  });
  savedDoctor.save(function(err, doctor) {
    if (err) {
      var error = 'User already exist';
      console.log(error);
    }
    else {
    console.log("SAVED\n" + savedDoctor);
    req.session.doctorID = doctor._id;
    }
  });
}

function validSignIn(req) {
  console.log((req.body.fullName && req.body.password));
  return (req.body.fullName && req.body.password);
}

function authenticationErrors(err, doctor) {
  return (error || !doctor);
}

function authenticateDoctor(req) {
  doctorSchema.authenticate(req.body.fullName, req.body.password, function (error, doctor) {
  if (authenticationErrors(error, doctor)) {
    var err = new Error('Wrong name and/or password');
    res.redirect('/');
  } 
  else {
    req.session.doctorId = doctor._id;
    console.log(req.session.doctorID);
    return res.redirect('/doctor/add_prescription');
  }
});
}

module.exports = router;

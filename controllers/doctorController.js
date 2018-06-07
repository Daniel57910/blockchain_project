var express = require('express');
var router = express.Router();
var doctorSchema = require('../models/doctorModel.js');
var loggedInDoctor = require('../src/doctor.js');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/doctor/sign_in', function(req, res, next) {
  res.render('../views/doctor_views/sign_in_doctor', {incorrectSignIn: req.flash('signUpError')});
});

router.post('/doctor/sign_in/:id', function (req, res, next) {
  if (validSignIn(req)) {
    authenticateDoctor(req, res);
  }
  else {
    returnToDoctorSignUp(req, res);
  }
});

router.get('/doctor/new_registration', function (req, res, next) {
  res.render('../views/doctor_views/sign_up_doctor', {incorrectRegistration: req.flash('registrationError')});
});

router.post('/doctor/new_registration/', function (req, res, next) {
  if (passwordsDontMatch(req) || !(correctRegistrationCredentials(req))) {
    returnToDoctorRegistration(req, res);
  }
  else {
    loginNewDoctor(req);
    req.session.doctorLoggedIn = true;
    res.redirect('/doctor/add_prescription');
  }
});

function loginNewDoctor(req) {
  doctorSchema.findOne({ fullName: req.body.fullName, password: req.body.password}, function (err, obj) { saveDoctor(req);});
}

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
      res.redirect('/');
    }
    else {
    console.log("SAVED\n" + savedDoctor);
    req.session.doctorID = doctor._id;
    console.log(req.session);
    }
  });
}

function passwordsDontMatch(req) {
  return (req.body.password !== req.body.confirm_password);
}

function validSignIn(req) {
  return (req.body.fullName && req.body.password);
}

function correctRegistrationCredentials(req) {
  return(req.body.fullName && req.body.ID && req.body.password);
}

function authenticationErrors(error, doctor) {
  return (error || !doctor);
}

function authenticateDoctor(req, res) {
  doctorSchema.authenticate(req.body.fullName, req.body.password, function (error, doctor) {
    if (authenticationErrors(error, doctor)) {
      returnToDoctorSignUp(req, res);
    } 
    else {
      successfullDoctorSignUp(req, res, doctor);
    }
  });
}

function returnToDoctorSignUp(req, res) {
  req.flash('signUpError', "Error With Doctor Signing In");
  res.redirect('/doctor/sign_in');
}

function returnToDoctorRegistration(req, res) {
  req.flash('registrationError', "Error with doctor registration, ensure all elements of form filled in correctly.");
  res.redirect('/doctor/new_registration');
}

function successfullDoctorSignUp(req, res, doctor) {
  req.session.doctorId = doctor._id;
  console.log(req.session);
  res.redirect('/doctor/add_prescription');
}

module.exports = router;

var express = require('express');
var router = express.Router();
var doctorSchema = require('../models/doctorModel.js');
var loggedInDoctor = require('../src/doctor.js');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/sign-up-doctor', function (req, res) {
  res.render('../views/doctor_views/sign_up_doctor');
});

router.post('/doctor_signed', function (req, res) {
  saveDoctor(req);
  res.redirect('/add_prescription');
});

router.get('/sign-in-doctor', function(req, res) {
  res.render('../views/doctor_views/sign_in_doctor');
});

router.post('/doctor_logged', function (req, res, next) {
  if (req.body.fullName && req.body.password) {
    doctorSchema.authenticate(req.body.fullName, req.body.password, function(error, doctor) {
      if (error || !doctor) {
        var err = new Error('Wrong name and/or password')
        return next(err);
      } else{
        req.session.doctorId = doctor._id;
        return res.redirect('/add_prescription');
      }
    })

  }
})

router.post('/doctor_signed', function (req, res, next) {
  if (req.body.password !== req.body.confirm_password) {
    var err = 'Password not confirmed do not match.'
    return next(err);
  }
  if (req.body.fullName &&
     req.body.ID &&
     req.body.password &&
     req.body.confirm_password) {


  doctorSchema.findOne({fullName: req.body.fullName, password: req.body.password}, function(err, obj) { logDoctorIn(obj);} );
}
  res.redirect('/add_prescription');
});


function logDoctorIn(obj) {
  loggedInDoctor = new loggedInDoctor(obj.fullName, obj.doctorID, obj.password);
  console.log("logged in doctor is \n" + loggedInDoctor.name + " " + loggedInDoctor.ID + " " + loggedInDoctor.password);
}

function saveDoctor(req) {
  savedDoctor = new doctorSchema({
    fullName: req.body.fullName,
    doctorID: req.body.ID,
    password: req.body.password,
  });
  savedDoctor.save(function(err, doctor) {
    if (err) {
      var error = 'User already exist'
      console.log(error);

    }
    else {
    console.log("SAVED\n" + savedDoctor);
    req.session.doctorID = doctor._id;
    }
  });
}

module.exports = router;

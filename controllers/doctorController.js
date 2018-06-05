// var app = require('../app')
var express = require('express');
var router = express.Router();
var doctorSchema = require('../models/doctorModel.js');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/sign-up-doctor', function (req, res) {
  res.render('../views/doctor_views/sign_up_doctor');
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
    // return next(err);
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
  savedDoctor = new doctorSchema({
    fullName: req.body.fullName,
    doctorID: req.body.ID,
    password: req.body.password,
  });
  savedDoctor.save(function(err, doctor) {
    if (err) {
      var err = 'User already exist'
      return next(err);
    }
    else {
    console.log("SAVED\n" + savedDoctor);
    req.session.doctorID = doctor._id;
    res.redirect('/add_prescription');
  };
});
}
});

module.exports = router;

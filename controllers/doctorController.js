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

router.post('/doctor_signed', function (req, res, next) {
  if (req.body.fullName &&
     req.body.ID &&
     req.body.password &&
     req.body.confirm_password) {
  savedDoctor = new doctorSchema({
    fullName: req.body.fullName,
    doctorID: req.body.ID,
    password: req.body.password,
    confirm_password: req.body.confirm_password
  });
  savedDoctor.save(function(err, doctor) {
    if (err) {
      var err = 'user already exist'
      return next(err)
    }
    else {
    console.log("SAVED\n" + savedDoctor);
    res.redirect('/');
  };
});
}
});

module.exports = router;

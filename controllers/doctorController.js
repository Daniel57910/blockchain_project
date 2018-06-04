// var app = require('../app')
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/sign-up-doctor', function (req, res) {
  res.render('../views/doctor_views/sign_up_doctor');
});

router.get('/sign-in-doctor', function(req, res) {
  res.render('../views/doctor_views/sign_in_doctor');
});
//
// router.post('/doctor/doctor_signed', function (req, res) {
//   savedDoctor = new doctorSchema({
//     fullName: req.body.fullName,
//     doctorID: req.body.ID,
//     password: req.body.password
//   });
//   savedDoctor.save(function(err, res) {
//     if (err) throw "ERR";
//     console.log("SAVED\n" + savedDoctor);
//   });
//   res.redirect('/');
// });

module.exports = router;

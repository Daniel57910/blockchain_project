// var app = require('../app')
var express = require('express');
var router = express.Router();
var doctorSchema = require('../models/doctorModel.js');
var loggedInDoctor = require('../src/doctor.js');
log = new loggedInDoctor("1", 2, 3);
console.log(log.name);

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/sign-up-doctor', function (req, res) {
  res.render('../views/doctor_views/sign_up_doctor');
});

router.post('/doctor_signed', function (req, res) {
  saveDoctor(req);
  res.redirect('/');
});

router.get('/sign-in-doctor', function(req, res) {
  res.render('../views/doctor_views/sign_in_doctor');
});

module.exports = router;

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

// router.post('/doctor_logged_in', function(req, res) {
//   console.log(req.body);
  doctorSchema.findOne({fullName: req.body.fullName, password: req.body.password}, function(err, obj) { logDoctorIn(obj);} );
}
  res.redirect('/add_prescription');
});




function logDoctorIn(obj) {
  loggedInDoctor = new loggedInDoctor(obj.fullName, obj.doctorID, obj.password);
  console.log("logged in doctor is \n" + loggedInDoctor.name + " " + loggedInDoctor.ID + " " + loggedInDoctor.password);
}
//
// function saveDoctor(req) {
//   savedDoctor = new doctorSchema({
//     fullName: req.body.fullName,
//     doctorID: req.body.ID,
//     password: req.body.password,
//   });
//   savedDoctor.save(function(err, doctor) {
//     if (err) {
//       var err = 'User already exist'
//       return next(err);
//     }
//     else {
//     console.log("SAVED\n" + savedDoctor);
//     req.session.doctorID = doctor._id;
//     res.redirect('/add_prescription');
//   };
// });
// }
// };
//
// module.exports = router;
//   savedDoctor.save(function (err, res) {
//     if (err) throw "ERR";
//     console.log("SAVED\n" + savedDoctor);
//   });

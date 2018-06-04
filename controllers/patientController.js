var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/sign-up-patient', function (req, res) {
  res.render('../views/patient_views/sign_up_patient');
});

router.get('/sign-in-patient', function (req, res) {
  res.render('../views/patient_views/sign_in_patient');
});

module.exports = router;
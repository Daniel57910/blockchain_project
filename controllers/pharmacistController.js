var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());

router.get('/sign-up-pharmacist', function (req, res) {
  res.render('pharmacist_views/sign_up_pharmacist');
});
router.get('/sign-in-pharmacist', function (req, res) {
  res.render('pharmacist_views/sign_in_pharmacist');
});

module.exports = router;
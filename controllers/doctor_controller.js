var app = require('../app.js');
console.log(app);
/*
app.get('/doctor/sign-up-doctor', function (req, res) {
  console.log("SIGN UP CHECKING REQUEST");
  res.send('hello');
});

app.get('/doctor/sign-in-doctor', function(req, res) {
  res.render('../views/doctor_views/sign_in_doctor');
});

app.post('/doctor/doctor_signed', function (req, res) {
  savedDoctor = new doctorSchema({
    fullName: req.body.fullName,
    doctorID: req.body.ID,
    password: req.body.password
  });
  savedDoctor.save(function(err, res) {
    if (err) throw "ERR";
    console.log("SAVED\n" + savedDoctor);
  });
  res.redirect('/');
});

*/
var env = process.env.NODE_ENV || "test";
var dependencies = require("./dependencies.js");
var app = dependencies.setupApp();
var Chain = require("./lib/blockChain.js");
var Block = require("./lib/block.js");
var models = require("./models/allModels.js");
var doctorSchema = require('./models/doctorModel.js');
var patientSchema = require('./models/patientModel.js');
var chain = new Chain.Chain();
models = new models();
doctor = new models.doctorModel();
console.log(doctor);

dependencies.connectToDatabase(env);
app.set('view engine', 'ejs');
app.use(dependencies.bodyParser.urlencoded({extended: true}));
app.use(dependencies.express.static(dependencies.path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/sign-in-doctor', function(req, res) {
  res.render('sign_in_doctor');
});

app.get('/sign-up-patient', function (req, res) {
  res.render('sign_up_patient');
});

app.post('/patient_signed', function (req, res) {
  let savedPatient = new patientSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    password: req.body.password
  });
  savedPatient.save(function(err, res) {
    if (err) throw "ERROR";
    console.log("SAVED\n" + savedPatient);
  });
  res.redirect('/');
});

app.get('/sign-in-patient', function (req, res) {
  res.render('sign_in_patient');
});

app.post('/sign-in-patient', function (req, res) {
  res.render('sign_in_patient');
});

app.get('/sign-up-doctor', function (req, res) {
  res.render('sign_up_doctor');
});
app.get('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});
app.get('/sign-in-pharmacist', function (req, res) {
  res.render('sign_in_pharmacist');
});

app.post('/doctor_signed', function (req, res) {
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

app.get('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});
app.post('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});

app.post('/', function (req, res) {
  res.render('home');
});

app.post('/home', function (req, res) {
  res.render('index');
});
app.get('/homepage', function (req, res) {
  res.render('index');
});

app.post('/info', function(req, res){
  let newBlock = new Block.Block(req.body.patientNames, req.body.doctorName, req.body.prescription);
  chain.addBlock(newBlock);
  res.render('info');
});

app.listen(9000, () => console.log('Pharmacy app listening on port 9000'));

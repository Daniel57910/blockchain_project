var env = process.env.NODE_ENV || "test";
var dependencies = require("./dependencies.js");
var app = dependencies.setupApp();
var Chain = require("./lib/blockChain.js");
var Block = require("./lib/block.js");
var patientSchema = require('./models/patientModel.js');
var chain = new Chain.Chain();

dependencies.connectToDatabase(env);
app.set('view engine', 'ejs');
app.use(dependencies.bodyParser.urlencoded({extended: true}));
app.use(dependencies.express.static(dependencies.path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/sign-up-patient', function (req, res) {
  res.render('sign_up_patient');
});
app.post('/hello', function (req, res) {
  let savedPatient = new patientSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    password: req.body.password
  });
  savedPatient.save(function(err, res) {
    if (err) throw "ERROR";
    console.log("SAVED");
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

app.post('/sign-up-doctor', function (req, res) {
  res.render('sign_up_doctor');
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

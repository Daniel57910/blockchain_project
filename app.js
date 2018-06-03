var env = process.env.NODE_ENV || "test";
var dependencies = require("./dependencies.js");
var app = dependencies.setupApp();
var Chain = require("./lib/blockChain.js");
var Block = require("./lib/block.js");
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
  console.log(req.body);
  console.log(req.body.firstName);
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
app.get('/sign-in-doctor', function (req, res) {
  res.render('sign_in_doctor');
});
app.post('/sign-in-doctor', function (req, res) {
  res.render('sign_in_doctor');
});

app.get('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});
app.post('/sign-up-pharmacist', function (req, res) {
  res.render('sign_up_pharmacist');
});
app.get('/sign-in-pharmacist', function (req, res) {
  res.render('sign_in_pharmacist');
});
app.post('/sign-in-pharmacist', function (req, res) {
  res.render('sign_in_pharmacist');
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
  console.log(req.param('prescription'));
  console.log(req.param('patientNames'));
  console.log(req.param('doctorName'));
  let newBlock = new Block.Block(req.param('patientNames'), req.param('doctorName'), req.param('prescription'));
  console.log(newBlock);
  chain.addBlock(newBlock);
  console.log(chain);
  res.render('info');
});

app.listen(9000, () => console.log('Pharmacy app listening on port 9000'));

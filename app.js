var env = process.env.NODE_ENV || "test";
var dependencies = require("./dependencies.js");
var app = dependencies.setupApp();
var Chain = require("./src/blockChain.js");
var Block = require("./src/block.js");
var doctorController = require('./controllers/doctorController');
var patientController = require('./controllers/patientController');
var pharmacistController = require('./controllers/pharmacistController');
var session = require('express-session');
var prescriptionController = require('./controllers/prescriptionController');
var chain = new Chain.Chain();
app.set('view engine', 'ejs');
app.use(dependencies.bodyParser.urlencoded({ extended: true }));
app.use(dependencies.express.static(dependencies.path.join(__dirname, 'public')));
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.use('/', doctorController);
app.use('/', patientController);
app.use('/', pharmacistController);
app.use('/', prescriptionController);
var chain = new Chain.Chain();
dependencies.connectToDatabase(env);

app.get('/', function (req, res) {
  res.render('home');
});

app.post('/home', function (req, res) {
  res.render('index');
});

app.get('/add_prescription', function (req, res, next) {
  console.log(req.session)
  res.render('add_prescription');
});

app.post('/prescription_confirmation', function(req, res){
  let newBlock = new Block.Block(req.body.patientNames, req.body.doctorName, req.body.prescription);
  chain.addBlock(newBlock);
  res.render('prescription_stored');
});

module.exports = app;

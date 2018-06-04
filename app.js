var env = process.env.NODE_ENV || "test";
var dependencies = require("./dependencies.js");
var app = dependencies.setupApp();
var Chain = require("./lib/blockChain.js");
var Block = require("./lib/block.js");
var doctorController = require('./controllers/doctorController');
var patientController = require('./controllers/patientController');
var pharmacistController = require('./controllers/pharmacistController');

var chain = new Chain.Chain();
app.use('/', doctorController);
app.use('/', patientController);
app.use('/', pharmacistController);

var chain = new Chain.Chain();
dependencies.connectToDatabase(env);
app.set('view engine', 'ejs');
app.use(dependencies.bodyParser.urlencoded({extended: true}));
app.use(dependencies.express.static(dependencies.path.join(__dirname, 'public')));
app.get('/', function (req, res) {
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

module.exports = app;

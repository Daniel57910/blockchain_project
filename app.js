var env = process.env.NODE_ENV || "test";
var dependencies = require("./dependencies.js");
var app = dependencies.setupApp();

var doctorController = require('./controllers/doctorController');
var patientController = require('./controllers/patientController');
var pharmacistController = require('./controllers/pharmacistController');
var prescriptionController = require('./controllers/prescriptionController');

var session = require('express-session');
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
dependencies.connectToDatabase(env);

app.get('/', function (req, res) {
  res.render('home');
});

module.exports = app;

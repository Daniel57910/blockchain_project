var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('/index');
});

app.listen(9000, () => console.log('Pharmacy app listening on port 9000')); 
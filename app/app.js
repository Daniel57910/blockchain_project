var express = require('express');
var app = express();

app.use(express.static('views'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.listen(9000, () => console.log('Pharmacy app listening on port 9000'));

let app = require('./dependencies.js');
var port = process.env.PORT || 9000;

var server = app.express.listen(port, function () {
  console.log("listening on " + port);
});
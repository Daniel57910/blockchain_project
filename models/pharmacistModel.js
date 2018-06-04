var mongoose = require('mongoose');

var pharmacistSchema = mongoose.Schema({
  fullName: String,
  pharmacistID: String,
  password: String,
});

var pharmacist = mongoose.model("all_pharmacists", pharmacistSchema);
module.exports = pharmacist;

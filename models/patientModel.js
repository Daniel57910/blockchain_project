var mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
  userName: String,
  dob: String,
  password: String
});

var patient = mongoose.model("all_patients", patientSchema);
module.exports = patient;
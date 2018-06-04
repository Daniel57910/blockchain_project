var mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  password: String
});

var patient = mongoose.model("all_patients", patientSchema);
module.exports = patient;
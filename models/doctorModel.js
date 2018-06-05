var mongoose = require('mongoose');

var doctorSchema = mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  doctorID: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password:{
    type: String,
    required: true,
  }

});

var doctor = mongoose.model("all_doctors", doctorSchema);
module.exports = doctor;

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var patientSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

//authenticate input against database
patientSchema.statics.authenticate = function (userName, password, callback) {
  patient.findOne({ userName: userName })
  .exec(function (err, patient) {
    if (err) {
      return callback(err)
    } else if (!patient) {
      var err = new Error('Patient not found. ');
      return callback(err);
    }
    bcrypt.compare(password, patient.password, function (err, result) {
      if (result === true) {
        return callback(null, patient);
      } else {
        return callback();
      }
    })
  });
}

patientSchema.pre('save', function(next){
  var patient = this;
  bcrypt.hash(patient.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    patient.password = hash;
    next();
  });
});

var patient = mongoose.model("all_patients", patientSchema);
module.exports = patient;

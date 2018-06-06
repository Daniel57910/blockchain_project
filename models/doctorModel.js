var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
  }
});

//authenticate input against database
doctorSchema.statics.authenticate = function (fullName, password, callback) {
  doctor.findOne({ fullName: fullName })
  .exec(function (err, doctor) {
    if (err) {
      return callback(err)
    } else if (!doctor) {
      var err = new Error('Doctor not found. ');
      return callback(err);
    }
    bcrypt.compare(password, doctor.password, function (err, result) {
      if (result === true) {
        return callback(null, doctor);
      } else {
        return callback();
      }
    })
  });
}

doctorSchema.pre('save', function(next){
  var doc = this;
  bcrypt.hash(doc.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    doc.password = hash;
    next();
  });
});

var doctor = mongoose.model("all_doctors", doctorSchema);
module.exports = doctor;

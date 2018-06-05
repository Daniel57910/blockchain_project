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
  },
  confirm_password:{
    type: String,
    required: true,
  }

});

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

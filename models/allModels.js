const doctorModel = require("./doctorModel.js");
const patientModel = require('./patientModel.js');
const pharmacistModel = require('./pharmacistModel');

class Models {
  constructor() {
    this.doctorModel = doctorModel;
    this.patientModel = patientModel;
    this.patientModel = pharmacistModel;
  }
}

module.exports = Models;
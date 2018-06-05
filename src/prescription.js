const patient = require("./patient.js");
const pharmacist = require("./pharmacist.js");
const doctor = require("./doctor.js");
class Prescription {
  constructor(patientName, patientID, doctorName, doctorID, prescription) {
    this.doctor = new doctor(doctorName, doctorID);
    this.patient = new patient(patientName, patientID);
    this.prescription = prescription;
  }
}
module.exports = Prescription;

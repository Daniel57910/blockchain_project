const patient = require("./patient.js");
const pharmacist = require("./pharmacist.js");
const doctor = require("./doctor.js");
class Prescription {
  constructor(patientName,  doctorName, prescription) {
    this.doctor = new doctor(doctorName);
    this.patient = new patient(patientName);
    this.prescription = prescription;
  }
}
module.exports = Prescription;

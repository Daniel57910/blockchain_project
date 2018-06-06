let Finder = require("../src/prescriptionFinder.js")

describe('Prescription search functionality:', function() {

beforeEach(function() {

  function Block(prescription) {
    this.prescription = prescription
  }

  function Blockchain(block) {
    this.chain = ["genesis", block];
  }

  function Prescription(patient, doctor) {
      this.patient = patient
      this.doctor = doctor
  }

  function Patient(patientName) {
    this.name = patientName
  }

  function Doctor(doctorName) {
      this.name = doctorName
  }

  testDoctor = new Doctor('Daniel')
  testPatient = new Patient('Sam')
  testPrescription = new Prescription(testPatient, testDoctor);
  testBlock = new Block(testPrescription);
  testBlockchain = new Blockchain(testBlock);
  testFinder = new Finder.Finder();
})

  it('finds the patient prescriptions', function() {
    expect(testFinder.findPatientPrescriptions(testBlockchain, 'Sam')).toEqual([testPrescription]);
  });
});

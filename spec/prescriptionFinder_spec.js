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

  it('throws an error when there is no prescriptions for the patient', function(){
    expect(function() {
      testFinder.findPatientPrescriptions(testBlockchain, "John Doe");
    }).toThrow("No prescriptions for this patient name");
  });

  it('finds prescriptions issued by the doctor', function(){
    expect(testFinder.findDoctorPrescriptions(testBlockchain, "Daniel")).toEqual([testPrescription]);
  });
});

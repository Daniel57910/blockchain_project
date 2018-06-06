let prescriptionFinder = ("../src/prescriptionFinder.js")

describe('Prescription search functionality:', function() {

beforeEach(function() {

  function Block(prescription) {
    this.prescription = prescription
  }

  function Blockchain(block) {
    this.chain = [block];
  }

  function Prescription(patient, doctor) {
      this.patient = patient
      this.doctor = doctor
  }

  function Patient(patientName) {
    this.patientName = patientName
  }

  function Doctor(doctorName) {
      this.doctorName = doctorName
  }

  testDoctor = new Doctor('Daniel')
  testPatient = new Patient('Sam')
  testPrescription = new Prescription(testDoctor, testPatient)
  testBlock = new Block(testPrescription)
  testBlockchain = new Blockchain(testBlock)
})

  it('finds the patient prescriptions', function() {
    expect(prescriptionFinder.findPatientPrescriptions("Sam")).toEqual([prescription]);
  });
});

let Prescription = require("../src/prescription.js");

describe('Creating a new Pharmacist', function() {

  beforeEach(function() {
    prescription = new Prescription("Bob", "Jim", "Morphine");
  });

  it("assigns a doctor, a patient, and the drug (or drugs) to the Prescriptionon initialization", function() {
    expect(prescription.doctorName).toEqual("Bob");
    expect(prescription.patientName).toEqual("Jim");
    expect(prescription.prescription).toEqual("Morphine");
  });
});

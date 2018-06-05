let Prescription = require("../src/prescription.js");

describe('Creating a new Pharmacist', function() {

  beforeEach(function() {
    prescription = new Prescription("Bob","1", "Jim", "2", "Morphine");
  });

  it("assigns a doctor, a patient, and the drug (or drugs) to the Prescriptionon initialization", function() {
    expect(prescription.doctor.name).toEqual("Jim");
    expect(prescription.patient.name).toEqual("Bob");
    expect(prescription.prescription).toEqual("Morphine");
  });
});

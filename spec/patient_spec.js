let Patient = require("../src/patient.js");

describe('creating a new patient correctly', function () {

  beforeEach(function () {
    patient = new Patient("Jim", "123456", "ABC9999");
  });

  it("assigns the doctor a name, ID and password on initialization", function () {
    expect(patient.name).toEqual("Jim");
    expect(patient.ID).toEqual("123456");
    expect(patient.password).toEqual("ABC9999");
  });
  
});
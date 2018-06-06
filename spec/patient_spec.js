let Patient = require("../src/patient.js");

describe('creating a new patient correctly', function () {

  beforeEach(function () {
    patient = new Patient("Jim", "123456");
  });

  it("assigns the doctor a name and ID on initialization", function () {
    expect(patient.name).toEqual("Jim");
    expect(patient.ID).toEqual("123456");
  });
});

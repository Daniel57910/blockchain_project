let Doctor = require("../src/doctor.js");

describe('creating a new doctor', function() {

  beforeEach(function() {
    doctor = new Doctor("Jim", "123456");
  });

  it("assigns the doctor a name, ID and password on initialization", function() {
    expect(doctor.name).toEqual("Jim");
    expect(doctor.ID).toEqual("123456");
  });
});

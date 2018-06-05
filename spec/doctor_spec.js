let Doctor = require("../src/doctor.js");
console.log(Doctor);
doctor = new Doctor("a",1, 1);
console.log(doctor);

describe('creating a new doctor', function() {
  
  beforeEach(function() {
    doctor = new Doctor("Jim", "123456", "ABC9999");
  });

  it("assigns the doctor a name, ID and password on initialization", function() {
    expect(doctor.name).toEqual("Jim");
    expect(doctor.ID).toEqual("123456");
    expect(doctor.password).toEqual("ABC9999");
  });

});
    
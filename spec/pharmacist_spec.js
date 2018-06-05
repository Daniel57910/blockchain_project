let Pharmacist = require("../src/pharmacist.js");

describe('Creating a new Pharmacist', function() {

  beforeEach(function() {
    pharmacist = new Pharmacist("Bob", "123456", "ABC9999");
  });

  it("assigns the Pharmacist a name, ID and password on initialization", function() {
    expect(pharmacist.name).toEqual("Jim");
    expect(pharmacist.ID).toEqual("123456");
    expect(pharmacist.password).toEqual("ABC9999");
  });
});

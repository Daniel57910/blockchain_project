let Block = require('../lib/block.js');
let Chain = require("../lib/blockChain.js");
const DATEFORMAT = require("dateformat");
console.log(Block);

describe('block creation', function() {

  beforeEach(function() {
    jasmine.clock().install();
    testBlock = new Block.Block("Sam", "Daniel", "Morphine");
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    chain = new Chain.Chain();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('returns the correct name of the patient', function() {
    expect(testBlock.patientName).toEqual("Sam");
  });

  it('returns the correct name of the doctor', function () {
    expect(testBlock.doctorName).toEqual("Daniel");
  });

  it('returns the correct prescription', function () {
    expect(testBlock.prescription).toEqual("Morphine");
  });

  it("adds the current date as the timestamp", function() {
    expect(testBlock.timestamp).toEqual(baseTime);
  });

  it("sets the index to 1 by default, then increments the index by 1 for every new chain", function() {
    expect(testBlock.index).toEqual(1);
    sampleChain = [];
    sampleChain.push(testBlock);
    newBlock = new Block.Block("KIM");
    newBlock.index = sampleChain[sampleChain.length - 1].index + 1;
    expect(newBlock.index).toEqual(testBlock.index + 1);
  });
});

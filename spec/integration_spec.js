let Block = require('../lib/block.js');
let Chain = require("../lib/blockChain.js");
const DATEFORMAT = require("dateformat");

describe('block integrity', function() {

  beforeEach(function() {
    jasmine.clock().install();
    testBlock = new Block.Block("Sam", "Daniel", "Morphine");
    testBlock2 = new Block.Block("Gadiza", "Sam", "Valium");
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    chain = new Chain.Chain();
    chain.addBlock(testBlock);
    chain.addBlock(testBlock2);
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('returns true if chain is valid', function() {
    expect(chain.integrityChecker()).toBe(true);
  });

  it('throws error if chain is invalid', function() {
    testBlock.doctorName = "Patryk";
    testBlock.hash = testBlock.calculateHash();
    expect(function() {
      chain.integrityChecker();
    }).toThrow("Chain is invalid");
  });
});

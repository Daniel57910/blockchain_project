let Block = require('../lib/block.js');
let Chain = require("../lib/blockChain.js");
const DATEFORMAT = require("dateformat");

describe('integration testing', function() {

  beforeEach(function() {
    jasmine.clock().install();
    testBlock = new Block.Block("Sam", "Gadiza", "Morphine");
    testBlock2 = new Block.Block("Sam", "Gadiza", "Valium");
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    chain = new Chain.Chain();
    chain.addBlock(testBlock);
    chain.addBlock(testBlock2);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe('chain creation', function() {

    it("assign previous hash to the new block", function(){
      expect(chain.chain[2].previousHash).toEqual(testBlock.hash);
    });
  });

  describe('block integrity', function() {

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

  describe('prescription search functionality', function() {

    it('finds patient-specific blocks in the chain', function() {
      expect(chain.findPatientPrescriptions("Sam")).toEqual([testBlock, testBlock2]);
    });

    it('throws an error if no prescriptions for the patient', function() {
      expect(function() {
        chain.findPatientPrescriptions("John Doe");
      }).toThrow("No prescriptions for this patient name");
    })

    it('finds prescriptions issued by doctors in the chain', function() {
      expect(chain.findDoctorPrescriptions("Gadiza")).toEqual([testBlock, testBlock2]);
    });

    it('throws an error if no prescriptions by the doctor', function() {
      expect(function() {
        chain.findDoctorPrescriptions("John Doe");
      }).toThrow("No prescriptions by this doctor");
    });
  });
});

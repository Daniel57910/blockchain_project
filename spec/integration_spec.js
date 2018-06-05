let Block = require('../src/block.js');
let Chain = require("../src/blockChain.js");
let Prescription = require("../src/prescription.js");
prescription1 = new Prescription("Sam", "Daniel", "Ibruprofen");
prescription2 = new Prescription("Gadiza", "Patryk", "Paracetamol");
console.log(prescription1);
console.log(prescription2);
const DATEFORMAT = require("dateformat");

describe('integration testing', function() {

  beforeEach(function() {
    prescription1 = new Prescription("Sam", "Gadiza", "Ibruprofen");
    prescription2 = new Prescription("Sam", "Gadiza", "Paracetamol");
    testBlock = new Block.Block(prescription1);
    testBlock2 = new Block.Block(prescription2);
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    chain = new Chain.Chain();
    chain.addBlock(testBlock);
    chain.addBlock(testBlock2);
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
      testBlock.prescription.doctorName = "Patryk";
      testBlock.hash = testBlock.calculateHash();
      expect(function() {
        chain.integrityChecker();
      }).toThrow("Chain is invalid");
    });
  });

  describe('prescription search functionality', function() {

    it('finds patient-specific blocks in the chain', function() {
      expect(chain.findPatientPrescriptions("Sam")).toEqual([prescription1, prescription2]);
    });

    it('throws an error if no prescriptions for the patient', function() {
      expect(function() {
        chain.findPatientPrescriptions("John Doe");
      }).toThrow("No prescriptions for this patient name");
    });

    it('finds prescriptions issued by doctors in the chain', function() {
      expect(chain.findDoctorPrescriptions("Gadiza")).toEqual([prescription1, prescription2]);
    });

    it('throws an error if no prescriptions by the doctor', function() {
      expect(function() {
        chain.findDoctorPrescriptions("John Doe");
      }).toThrow("No prescriptions by this doctor");
    });
  });
  describe('mining test', function(){
    beforeEach(function(){
      difficultBlock = new Block.Block(prescription1);
      chain.difficulty = 3;
      chain.addBlock(difficultBlock);
    });
    it('hash has three zeros at the begining', function(){
      expect(chain.chain[3].hash.substring(0, 3)).toEqual('000');
    });
  });
});

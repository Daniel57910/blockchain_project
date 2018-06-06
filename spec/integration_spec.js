let Block = require('../src/block.js');
let Chain = require("../src/blockChain.js");
let ChainChecker = require("../src/chainChecker.js");
let Prescription = require("../src/prescription.js");
const DATEFORMAT = require("dateformat");

describe('integration testing', function() {

  beforeEach(function() {
    prescription1 = new Prescription("Sam", "1", "Gadiza", "2", "Ibruprofen");
    prescription2 = new Prescription("Sam", "1", "Gadiza", "2", "Paracetamol");
    testBlock = new Block.Block(prescription1);
    testBlock2 = new Block.Block(prescription2);
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    chain = new Chain.Chain();
    chainchecker = new ChainChecker.Chainchecker();
    chain.addBlock(testBlock);
    chain.addBlock(testBlock2);
  });

  describe('chain creation', function() {

    it("assign previous hash to the new block", function(){
      expect(chain.chain[2].previousHash).toEqual(testBlock.hash);
    });
  });

  describe('chain integrity', function() {

    it('returns true if chain is valid', function() {
      expect(chainchecker.integrityChecker(chain)).toBe(true);
    });

    it('throws error if chain is invalid', function() {
      testBlock.prescription.doctorName = "Patryk";
      testBlock.hash = testBlock.calculateHash();
      expect(function() {
        chainchecker.integrityChecker(chain);
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

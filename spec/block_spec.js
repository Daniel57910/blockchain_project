let Block = require('../src/block.js');
const DATEFORMAT = require("dateformat");
console.log(Block);

describe('block creation', function() {

  beforeEach(function() {
    testBlock = new Block.Block("Sam", "Daniel", "Morphine");
    baseTime = DATEFORMAT(new Date(), "isoDateTime");

    function Prescription(doctor = "Daniel", patient = "Sam", prescription = "Morphine") {
      this.doctorName = doctor;
      this.patientName = patient;
      this.prescription = prescription;
    }

    function Blockchain() {
      this.chain = [new Block.Block(new Prescription())];
    }

    Blockchain.prototype.findLastBlock = function() {
      return this.chain[this.chain.length - 1];
    };

    Blockchain.prototype.addBlock = function(newBlock) {
      newBlock.previousHash = this.findLastBlock().hash;
      newBlock.index = this.findLastBlock().index + 1;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    };
    chain = new Blockchain();
    prescription = new Prescription();
    testBlock = new Block.Block(prescription);
  });

  it('returns the correct name of the patient', function() {
    expect(testBlock.prescription.patientName).toEqual("Sam");
  });

  it('returns the correct name of the doctor', function () {
    expect(testBlock.prescription.doctorName).toEqual("Daniel");
  });

  it('returns the correct prescription', function () {
    expect(testBlock.prescription.prescription).toEqual("Morphine");
  });

  it("adds the current date as the timestamp", function() {
    expect(testBlock.timestamp).toEqual(baseTime);
  });

  it("sets the index to 1 by default, then increments the index by 1 for every new chain", function() {
    expect(testBlock.index).toEqual(1);
    sampleChain = [];
    sampleChain.push(testBlock);
    newBlock = new Block.Block(prescription);
    newBlock.index = sampleChain[sampleChain.length - 1].index + 1;
    expect(newBlock.index).toEqual(testBlock.index + 1);
  });

  it("assign previous hash to the new block", function(){
    chain.addBlock(testBlock);
    chain.addBlock(new Block.Block(prescription));
    expect(chain.chain[2].previousHash).toEqual(testBlock.hash);
  });

  it('mines the block with the right difficulty', function(){
    testBlock.mineBlock(3);
    expect(testBlock.hash.substring(0, 3)).toEqual('000');
  });
});

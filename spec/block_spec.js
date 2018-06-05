let Block = require('../lib/block.js');
const DATEFORMAT = require("dateformat");
console.log(Block);

describe('block creation', function() {

  beforeEach(function() {
    jasmine.clock().install();
    testBlock = new Block.Block("Sam", "Daniel", "Morphine");
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    // chain = new Chain.Chain();
    function Blockchain() {
      this.chain = [new Block.Block('Genesis_Patient', 'Genesis_Doctor', 'Genesis_Prescription')];
    }

    Blockchain.prototype.findLastBlock = function() {
      return this.chain[this.chain.length - 1];
    }

    Blockchain.prototype.addBlock = function(newBlock) {
      newBlock.previousHash = this.findLastBlock().hash;
      newBlock.index = this.findLastBlock().index + 1;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
    chain = new Blockchain
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

  it("assign previous hash to the new block", function(){
    chain.addBlock(testBlock);
    chain.addBlock(new Block.Block("Daniel,", "Sam", "Valium"));
    expect(chain.chain[2].previousHash).toEqual(testBlock.hash);
  });

  it('mines the block with the right difficulty', function(){
    testBlock.mineBlock(3)
    expect(testBlock.hash.substring(0, 3)).toEqual('000')
  })
});

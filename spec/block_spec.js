let Block = require('../lib/block.js');
let Chain = require("../lib/blockChain.js");
const DATEFORMAT = require("dateformat");
console.log(Block);

describe('block creation', function() {

  beforeEach(function() {
    jasmine.clock().install();
    testBlock = new Block.Block("KIM");
    baseTime = DATEFORMAT(new Date(), "isoDateTime");
    chain = new Chain.Chain();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('returns the correct data assigned to the block', function() {
    expect(testBlock.vote).toEqual("KIM");
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
    chain.addBlock(new Block.Block("Putin"));
    expect(chain.chain[2].previousHash).toEqual(testBlock.hash);
  });

});

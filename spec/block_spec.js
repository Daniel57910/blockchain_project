let Block = require('../lib/block.js');
console.log(Block);

describe('block creation', function() {
 
  beforeEach(function() {
    jasmine.clock().install();
    testBlock = new Block.Block("KIM");
    baseTime = new Date();
    jasmine.clock().mockDate(baseTime);
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('returns the correct data assigned to the block', function() {
    expect(testBlock.vote).toEqual("KIM");
  });
  
  it("adds the current date as the timestamp", function() {
    jasmine.clock().tick(50);
    expect(testBlock.timestamp.getTime()).toEqual(baseTime.getTime());
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

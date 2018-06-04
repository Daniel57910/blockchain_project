let Block = require('../lib/block.js');
let Chain = require("../lib/blockChain.js");
console.log(Chain);

describe('chain creation', function () {
  beforeEach(function() {
    chain = new Chain.Chain();
    block = new Block.Block('Kim');
  });
  it('creates first block', function() {
    expect(chain.createFirstBlock()).toEqual(chain.chain[0]);
  });

  it('adds a block', function() {
    chain.addBlock(block);
    expect(chain.chain[1]).toEqual(block)
  });
   expect(chain.chain[1]).toEqual(block);
  }); 
  it('finds the last block', function() {
    chain.addBlock(block);
    expect(chain.findLastBlock()).toEqual(block);
  });

});

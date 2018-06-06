let ChainChecker = require("../src/chainChecker.js");

describe('chainChecker tests', function(){
  beforeEach(function(){
    function Block(previousHash = '00111111') {
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce = 0;
    }
    Block.prototype.calculateHash = function() {
      return '00222222';
    };
    block = new Block();
    block2 = new Block('00222222');

    function Blockchain() {
      this.chain = [block, block2];
      this.difficulty = 2
    }
    chain = new Blockchain();
    chainchecker = new ChainChecker.Chainchecker();
  })

    it('throw an error if block hash does not match block.calculateHash()', function(){
      block2.hash = '00wrong hash'
      expect(function() {
        chainchecker.integrityChecker(chain);
      }).toThrow("Chain is invalid");
    })

    it('throw an error if block previoushash does not match previousblock.hash', function(){
      block2.previousHash = '00wrong hash'
      expect(function() {
        chainchecker.integrityChecker(chain);
      }).toThrow("Chain is invalid");
    })

    it('throw an error if block hash does not meet difficulty criteria', function(){
      block2.hash = 'wrong hash'
      expect(function() {
        chainchecker.integrityChecker(chain);
      }).toThrow("Chain is invalid");
    })
})

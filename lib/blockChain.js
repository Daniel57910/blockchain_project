const block = require("./block.js");

class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
  }

  createFirstBlock() {
    return new block.Block('Trumpyboy');
  }

  findLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.findLastBlock().hash;
    newBlock.index = this.findLastBlock().index + 1;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);

  }

}

exports.Chain = Blockchain;


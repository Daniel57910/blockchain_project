const ENCRYPT = require('crypto-js/sha512');

class Block {
  constructor(vote, previousHash = "") {
    this.index = 1;
    this.timestamp = new Date();
    this.vote = vote;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return ENCRYPT(this.index + this.previousHash + this.timestamp + JSON.stringify(this.vote)).toString();
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
  }

  createFirstBlock() {
    return new Block('Trumpyboy');
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
exports.Block = Block;

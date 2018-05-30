const ENCRYPT = require('crypto-js/sha512');

class Block {
  constructor(index, timestamp, vote, previousHash = ""){
    this.index = index;
    this.timestamp = timestamp;
    this.vote = vote;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return ENCRYPT(this.index + this.previousHash + this.timestamp + JSON.stringify(this.vote)).toString();
  }
}

exports.Block = Block;

class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
  }

  createFirstBlock() {
    return new Block(0, "01/01/2017", "First Block", "0");
  }

  findLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock() {

  }

}

let block = new Block(1, "4/11/17", "TRUMP", "dogs");
let chain = new Blockchain();
console.log(block);
console.log(chain);


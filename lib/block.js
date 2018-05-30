const ENCRYPT = require('crypto-js/sha512');

class Block {
  constructor(vote, previousHash = ""){
    this.index = 1;
    this.timestamp = new Date();
    this.vote = vote;
    this.previousHash = previousHash;
    //this.hash = this.calculateHash();
  }

  calculateHash() {
    return ENCRYPT(this.index + this.previousHash + this.timestamp + JSON.stringify(this.vote)).toString();
  }
}

exports.Block = Block;


const ENCRYPT = require('crypto-js/sha512');
const DATEFORMAT = require("dateformat");
//
class Block {
  constructor(vote, previousHash = "") {
    this.index = 1;
    this.timestamp = this.currentDate();
    this.vote = vote;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return ENCRYPT(this.index + this.previousHash + this.timestamp + JSON.stringify(this.vote)).toString();
  }

  currentDate() {
    return DATEFORMAT(new Date(), "isoDateTime");
  }

}

exports.Block = Block;
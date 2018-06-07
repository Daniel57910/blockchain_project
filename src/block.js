const ENCRYPT = require('crypto-js/sha512');
const DATEFORMAT = require("dateformat");

class Block {
  constructor(prescription, previousHash = "") {
    this.index = 1;
    this.timestamp = currentDate();
    this.prescription = prescription;
    this.previousHash = previousHash;
    this.hash = previousHash;
    this.nonce = 0;
  }

  calculateHash() {
    return ENCRYPT(this.index + this.timestamp + JSON.stringify(this.prescription) + this.previousHash + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
             this.nonce++;
             this.hash = this.calculateHash();
    }
  }

}

function currentDate() {
  return DATEFORMAT(new Date(), "isoDateTime");
}

exports.Block = Block;

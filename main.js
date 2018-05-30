const ENCRYPT = require('crypto-js/sha512');

class Block {
  constructor(index, timestamp, data, previousHash){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
}
exports.Block = Block;

class Blockchain {

}

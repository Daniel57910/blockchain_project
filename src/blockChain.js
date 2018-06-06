const block = require("./block.js");
const prescription = require("./prescription.js");

class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
    this.difficulty = 2
  }

  createFirstBlock() {
    return new block.Block(new prescription("Genesis Patient","Genesis PatientID", "Genesis Doctor", "Genesis DoctorID", "Genesis Prescription"));
  }

  findLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.findLastBlock().hash;
    newBlock.index = this.findLastBlock().index + 1;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }
}

exports.Chain = Blockchain;

const block = require("./block.js");

class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
    this.difficulty = 2
  }

  createFirstBlock() {
    return new block.Block('Genesis_Patient', 'Genesis_Doctor', 'Genesis_Prescription');
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

  integrityChecker() {
    for(let i = 1; i < this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];

        if(currentBlock.hash !== currentBlock.calculateHash()){
            throw 'Chain is invalid';
        }

        if(currentBlock.previousHash !== previousBlock.hash){
            throw 'Chain is invalid';
        }
    }
    return true;
  }

  findPatientPrescriptions(patientName) {
    var prescriptions = []
    for(let i = 1; i < this.chain.length; i++){
      var currentBlock = this.chain[i];
      if(currentBlock.patientName === patientName){
        prescriptions.push(currentBlock);
      }
    }
    if(prescriptions.length === 0){
      throw 'No prescriptions for this patient name';
    }
    return prescriptions
  }

  findDoctorPrescriptions(doctorName) {
    var doctorPrescriptions = []
    for(let i = 1; i < this.chain.length; i++){
      var currentBlock = this.chain[i];
      if(currentBlock.doctorName === doctorName){
        doctorPrescriptions.push(currentBlock);
      }
    }
    if(doctorPrescriptions.length === 0){
      throw 'No prescriptions by this doctor';
    }
    return doctorPrescriptions
  }
}

exports.Chain = Blockchain;

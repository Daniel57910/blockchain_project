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

  findPatientPrescriptions(patientName) {
    var prescriptions = []
    for(let i = 1; i < this.chain.length; i++){
      var currentBlock = this.chain[i].prescription;
      if(currentBlock.patient.name === patientName){
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
      var currentBlock = this.chain[i].prescription;
      if(currentBlock.doctor.name === doctorName){
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

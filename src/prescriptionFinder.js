const blockchain = require("./blockChain.js")

class Finder {

  constructor() {}

  findPatientPrescriptions(blockchain, patientName) {
    var prescriptions = []
    for(let i = 1; i < blockchain.chain.length; i++){
      var currentBlock = blockchain.chain[i].prescription;
      if(currentBlock.patient.name === patientName){
        prescriptions.push(currentBlock);
      }
    }
    if(prescriptions.length === 0){
      throw 'No prescriptions for this patient name';
    }
    return prescriptions
  }

  findDoctorPrescriptions(blockchain, doctorName) {
    var doctorPrescriptions = []
    for(let i = 1; i < blockchain.chain.length; i++){
      var currentBlock = blockchain.chain[i].prescription;
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

exports.Finder = Finder;

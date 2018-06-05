let Chain = require("../src/blockChain.js");

describe('chain creation', function () {
  beforeEach(function() {
    chain = new Chain.Chain();

    function Patient(name = 'Sam', id = '1') {
      this.name = name
      this.id = id
    }

    function Doctor(name = 'Daniel', id = '2') {
      this.name = name
      this.id = id
    }
    function Prescription(patient, doctor, prescription = "Morphine") {
      this.patient = patient;
      this.doctor = doctor;
      this.prescription = prescription;
    }
    function Block(prescription, previousHash = '') {
      this.index = 1;
      this.timestamp = this.currentDate();
      this.prescription = prescription;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce = 0;
    }
    Block.prototype.calculateHash = function() {
      return '000000123';
    };
    Block.prototype.currentDate = function() {
      return '2032018';
    };
    Block.prototype.mineBlock = function(difficulty) {
      this.hash = this.calculateHash();
      };
    patient = new Patient();
    doctor = new Doctor();
    prescription = new Prescription(patient, doctor);
    block = new Block(prescription);
  });



  it('creates first block', function() {
    expect(chain.createFirstBlock()).toEqual(chain.chain[0]);
  });

  it('adds a block', function() {
    chain.addBlock(block);
    expect(chain.chain[1]).toEqual(block);
  });

  it('finds the last block', function() {
    chain.addBlock(block);
    expect(chain.findLastBlock()).toEqual(block);
  });

  it('finds the patient prescriptions',function(){
    chain.addBlock(block);
    expect(chain.findPatientPrescriptions("Sam")).toEqual([prescription]);
  });

  it('finds prescriptions issued by the doctor', function(){
    chain.addBlock(block);
    expect(chain.findDoctorPrescriptions("Daniel")).toEqual([prescription]);
  });

  it('throws an error when there is no prescriptions for the patient', function(){
    expect(function() {
      chain.findPatientPrescriptions("John Doe");
    }).toThrow("No prescriptions for this patient name");
  });

  it('throws an error when there is no prescriptions by the doctor', function(){
    expect(function() {
      chain.findDoctorPrescriptions("John Doe");
    }).toThrow("No prescriptions by this doctor");
  });
});

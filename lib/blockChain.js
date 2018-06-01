const block = require("./block.js");

class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
  }

  createFirstBlock() {
    return new block.Block('Genesis_Doctor', 'Genesis_Patient', 'Genesis_Prescription');
  }

  findLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.findLastBlock().hash;
    newBlock.index = this.findLastBlock().index + 1;
    newBlock.hash = newBlock.calculateHash();
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

}

exports.Chain = Blockchain;

const chain = require("./blockChain.js")

class Chainchecker {

  constructor() {}

  integrityChecker(chain) {
    for(let i = 1; i < chain.chain.length; i++){
      const currentBlock = chain.chain[i];
      const previousBlock = chain.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        throw 'Chain is invalid';
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        throw 'Chain is invalid';
      }

      if(currentBlock.hash.substring(0, chain.difficulty) !== Array(chain.difficulty + 1).join("0")){
        throw 'Chain is invalid';
      }
    }
    return true;
  }
}

exports.Chainchecker = Chainchecker;

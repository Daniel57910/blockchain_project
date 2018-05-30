class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
  }

  createFirstBlock() {
    return new Block(0, "01/01/2017", "First Block", "0");
  }

  findLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.findLastBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);

  }

}

exports.Block = Block;
exports.Chain = Blockchain;


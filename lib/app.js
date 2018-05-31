let blockChain = require("./blockChain.js");
let block = require("./block.js");

blockChain = new blockChain.Chain();

console.log(blockChain);

block = new block.Block('Kim')

blockChain.addBlock(block);
console.log(blockChain);

const path = require("path");
const fs = require("fs");
const solc = require("solc");

const testContractPath = path.resolve(
  __dirname,
  "contracts",
  "TestContract.sol"
);
const source = fs.readFileSync(testContractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "TestContract.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "TestContract.sol"
].TestContract;

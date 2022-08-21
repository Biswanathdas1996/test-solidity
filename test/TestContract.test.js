const { expect } = require("chai");
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

let accounts;
let contract;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  contract = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("----> before each");
});

describe("contract", () => {
  it("deploys a contract", () => {
    assert.ok(contract.options.address);
  });

  it("has a default message", async () => {
    const message = await contract.methods.message().call();
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await contract.methods.setMessage("abc").send({ from: accounts[0] });
    const message = await contract.methods.message().call();
    assert.equal(message, "abc");
  });

  it("Insert data to struct", async () => {
    await contract.methods
      .addCollection(1, "Biswanath")
      .send({ from: accounts[0] });
    const collections = await contract.methods.getCollection().call();
    // mocha
    assert.equal(collections[0].name, "Biswanath");
    // chai
    expect(collections[0].id).to.equal("1");
    // console.log("----->", collections);
  });
});

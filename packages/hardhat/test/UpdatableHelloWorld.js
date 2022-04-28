const { expect } = require("chai");

describe("Updatable Hello World contract", function () {
  let factory;
  let contract;

  beforeEach(async function () {
    factory = await ethers.getContractFactory("UpdatableHelloWorld");
    contract = await factory.deploy("Hello World!");
  });


  describe("DEPLOYMENT", function () {
    it("Should set the message to \"Hello World!\"", async function () {
      const message = await contract.messages(0);

      expect(message).to.equal("Hello World!");
    });

    it("Should set the latest submitter to our deployer address", async function () {
      const [owner] = await ethers.getSigners();
      const latestSubmitter = await contract.latestSubmitter();

      expect(latestSubmitter).to.equal(owner.address);
    });

    it("Should set the our address latest message to \"Hello World!\"", async function () {
      const [owner] = await ethers.getSigners();

      const userMessage = await contract.getUserMessage(owner.address, 0);

      expect(userMessage).to.equal("Hello World!");
    });
  });

  describe("UPDATE MESSAGE", function () {
    it("Should update message to \"Updated Hello World!\"", async function () {
      const [owner] = await ethers.getSigners();

      const updateMessageTx = await contract.updateMessage("Updated Hello World!");
      const updateMessageTxReceipt =  await updateMessageTx.wait();
      const message = updateMessageTxReceipt.events[0].args.message;

      expect(message).to.equal("Updated Hello World!");
    });

    it("Should set the latest submitter to our deployer address", async function () {
      const [owner] = await ethers.getSigners();
      await contract.updateMessage("Updated Hello World!");
      const latestSubmitter = await contract.latestSubmitter();

      expect(latestSubmitter).to.equal(owner.address);
    });

    it("Should set the our address latest message to \"Updated Hello World!\"", async function () {
      const [owner] = await ethers.getSigners();
      await contract.updateMessage("Updated Hello World!");
      const userMessage = await contract.getUserMessage(owner.address, 1);

      expect(userMessage).to.equal("Updated Hello World!");
    });
  });

  describe("GET LATEST MESSAGE", function () {
    it("Should return the  \"Hello World!\" + our deployer address", async function () {
      const [owner] = await ethers.getSigners();

      const getLatestMessage = await contract.getLatestMessage();
      const message = getLatestMessage[0];
      const address = getLatestMessage[1];

      expect(message).to.equal("Hello World!");
      expect(address).to.equal(owner.address);
    });
  });

  describe("GET USER MESSAGE", function () {
    it("Should return our deployer first message: \"Hello World!\"", async function () {
      const [owner] = await ethers.getSigners();

      const userMessage = await contract.getUserMessage(owner.address, 0);

      expect(userMessage).to.equal("Hello World!");
    });

    it("Should return our deployer second message: \"Updated Hello World!\"", async function () {
      const [owner] = await ethers.getSigners();
      await contract.updateMessage("Updated Hello World!");
      const userMessage = await contract.getUserMessage(owner.address, 1);

      expect(userMessage).to.equal("Updated Hello World!");
    });

    it("Should revert because of message index", async function () {
      const [owner] = await ethers.getSigners();
      await expect(contract.getUserMessage(owner.address, 1)).to.be.reverted;
    });

    it("Should revert because of user address", async function () {
      const [owner, signer] = await ethers.getSigners();
      await expect(contract.getUserMessage(signer.address, 0)).to.be.reverted;
    });
  });
});
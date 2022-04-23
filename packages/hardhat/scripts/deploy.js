const { ethers } = require("hardhat");

async function main() {
    //Get the contract to deploy
    const factory = await ethers.getContractFactory("UpdatableHelloWorld");
    const contract = await factory.deploy("Hello World!");
  
    await contract.deployed();
  
    console.log("Updatable Hello World deployed to:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
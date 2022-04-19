const { ethers } = require("hardhat");

async function main() {
    //Get the contract to deploy
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await helloWorldFactory.deploy();
  
    await helloWorld.deployed();
  
    console.log("Hello World deployed to:", helloWorld.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const rinkebyAccountPk = "YOUR_RINKEBY_ACCOUNT_PK";

module.exports = {
  solidity: "0.8.13",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  paths: {
    artifacts: '../frontend/src/artifacts'
  },
  etherscan: {
    apiKey: "R793ZM9QYJDTFKWX3V2W3B9UX7XWIDHPUI"
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/YOUR_INFURA_ID",
      accounts: [`${rinkebyAccountPk}`],
    }
  }
};

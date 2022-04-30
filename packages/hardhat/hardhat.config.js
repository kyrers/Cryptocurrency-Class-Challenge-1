require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const rinkebyAccountPk = "YOUR_RINKEBY_ACCOUNT_PK";
const infuraID = "YOUR_INFURA_ID";

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
    apiKey: "YOUR_ETHERSCAN_API_KEY"
  },
  networks: {
    localhost: {
      url: "http://localhost:8545"
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraID}`,
      accounts: [`${rinkebyAccountPk}`],
    }
  }
};

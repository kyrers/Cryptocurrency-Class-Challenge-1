export const INFURA_ID = "YOUR_INFURA_ID";

export const NETWORKS = {
    localhost: {
        name: "localhost",
        color: "#666666",
        chainId: 31337,
        blockExplorer: "",
        rpcUrl: "http://" + window.location.hostname + ":8545",
    },
    rinkeby: {
        name: "rinkeby",
        color: "#e0d068",
        chainId: 4,
        rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
        faucet: "https://faucet.rinkeby.io/",
        blockExplorer: "https://rinkeby.etherscan.io/"
      }
}

export const targetNetwork = NETWORKS.rinkeby;
export const contractAddress = "YOUR_CONTRACT_ADDRESS";
import { ethers } from "ethers";
import { contractAddress } from '../config/Config';
import UpdatableHelloWorldArtifact from "../artifacts/contracts/UpdatableHelloWorld.sol/UpdatableHelloWorld.json";

export const loadContract = (signer) => {
    return new ethers.Contract(contractAddress, UpdatableHelloWorldArtifact.abi, signer);
}
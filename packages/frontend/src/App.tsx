//IMPORTS
import { ethers } from 'ethers';
import { useState } from 'react';
import { useContractLoader, useEventListener } from "eth-hooks";
import { targetNetwork, contractAddress } from './config/Config';
import HelloWorldArtifact from "./artifacts/contracts/HelloWorld.sol/HelloWorld.json"
//-----

//CONSTS
//const provider = new ethers.providers.Web3Provider(window.ethereum);
const provider = new ethers.providers.StaticJsonRpcProvider(targetNetwork.rpcUrl);
const signer = provider.getSigner();
const HelloWorldContract = new ethers.Contract(contractAddress, HelloWorldArtifact.abi, signer);
//-----

function App() {
  //EVENT LISTENERS
  //const message = useEventListener(HelloWorldContract, "Message", 1);
  //console.log("MESSAGE", message);
  //-----

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function hello() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const transaction = await HelloWorldContract.hello();
      await transaction.wait();
      console.log("TRANSACTION", transaction);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={hello}>Hello!</button>
      </header>
    </div>
  );
}

export default App;
